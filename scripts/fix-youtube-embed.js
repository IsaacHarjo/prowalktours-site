#!/usr/bin/env node
/**
 * scripts/fix-youtube-embed.js
 *
 * Applies the mount-gate fix to all video page client components to resolve
 * the YouTube embed black-box-on-first-load issue.
 *
 * Changes applied per file:
 *   1. Add `useState` to the react import
 *   2. Add `const [mounted, setMounted] = useState(false);` before playerIframeRef
 *   3. Add a mount effect `useEffect(() => { setMounted(true); }, []);`
 *   4. Add `if (!mounted) return;` at the top of the YT player init useEffect
 *   5. Change the YT player useEffect dep array from `[]` to `[mounted]`
 *   6. Wrap the <iframe ref={playerIframeRef} ... /> in `{mounted && (...)}`
 *
 * Skips files that already have `[mounted, setMounted]` declared.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const VIDEOS_DIR = path.join(ROOT, "app", "videos");

const dryRun = process.argv.includes("--dry-run");

function findClientFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...findClientFiles(full));
    } else if (entry.isFile() && entry.name.endsWith("Client.tsx")) {
      out.push(full);
    }
  }
  return out;
}

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const orig = content;

  if (content.includes("[mounted, setMounted]")) {
    return { status: "already-patched" };
  }

  // Step 1: Add useState to react import. Cover several orderings.
  const reactImportPatterns = [
    [/import \{ useEffect, useRef \} from "react";/, 'import { useEffect, useRef, useState } from "react";'],
    [/import \{ useRef, useEffect \} from "react";/, 'import { useEffect, useRef, useState } from "react";'],
    [/import \{ useEffect, useRef,([^}]*)\} from "react";/, 'import { useEffect, useRef, useState,$1} from "react";'],
  ];
  let importChanged = false;
  for (const [pat, rep] of reactImportPatterns) {
    if (pat.test(content) && !content.match(/import \{[^}]*useState[^}]*\} from "react"/)) {
      content = content.replace(pat, rep);
      importChanged = true;
      break;
    }
  }
  if (!importChanged && !content.match(/import \{[^}]*useState[^}]*\} from "react"/)) {
    return { status: "no-react-import-match" };
  }

  // Step 2: Insert mounted state before playerIframeRef declaration
  const playerIframeRefPattern = /(\s+)(const playerIframeRef = useRef<HTMLIFrameElement \| null>\(null\);)/;
  if (!playerIframeRefPattern.test(content)) {
    return { status: "no-playerIframeRef-match" };
  }
  content = content.replace(
    playerIframeRefPattern,
    '$1const [mounted, setMounted] = useState(false);$1$2'
  );

  // Step 3: Find the YouTube init useEffect. It's characterized by containing
  // 'playerRef.current = new window.YT.Player' and 'onYouTubeIframeAPIReady'.
  // We locate it line-by-line to handle any formatting.
  const lines = content.split("\n");
  let effectStartLine = -1;
  let effectEndLine = -1;
  let depth = 0;
  let inEffect = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inEffect) {
      // Look for `useEffect(() => {` that will contain the YT init
      if (/^\s*useEffect\(\(\) => \{\s*$/.test(line)) {
        // Peek ahead up to 30 lines to see if it contains window.YT.Player
        const window_ = lines.slice(i, Math.min(i + 60, lines.length)).join("\n");
        if (window_.includes("new window.YT.Player") && window_.includes("onYouTubeIframeAPIReady")) {
          effectStartLine = i;
          inEffect = true;
          depth = 1;
          continue;
        }
      }
    } else {
      // Track braces to find the matching close
      for (const ch of line) {
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
      }
      if (depth === 0) {
        effectEndLine = i;
        break;
      }
    }
  }

  if (effectStartLine === -1 || effectEndLine === -1) {
    return { status: "no-yt-useEffect-found" };
  }

  // The closing line should look like `}, []);` — change to `}, [mounted]);`
  const closingLine = lines[effectEndLine];
  const newClosing = closingLine.replace(/\}\s*,\s*\[\s*\]\s*\)\s*;/, "}, [mounted]);");
  if (newClosing === closingLine) {
    return { status: "no-closing-dep-array-match", line: closingLine };
  }
  lines[effectEndLine] = newClosing;

  // Insert `if (!mounted) return;` as the first line inside the effect body.
  // The opening `useEffect(() => {` is on effectStartLine.
  // Find the indentation of the next content line.
  const nextLine = lines[effectStartLine + 1];
  const indentMatch = nextLine.match(/^(\s+)/);
  const indent = indentMatch ? indentMatch[1] : "    ";
  lines.splice(effectStartLine + 1, 0, `${indent}if (!mounted) return;`);

  // Insert the setMounted effect BEFORE this effect. Walk back from
  // effectStartLine to find the last blank line above, then insert there.
  let insertBefore = effectStartLine;
  // Go back until we find a non-blank line
  while (insertBefore > 0 && lines[insertBefore - 1].trim() === "") insertBefore--;
  // insertBefore now points at the blank line (or the useEffect line)
  const effectIndentMatch = lines[effectStartLine].match(/^(\s+)/);
  const effectIndent = effectIndentMatch ? effectIndentMatch[1] : "  ";
  const mountEffectLines = [
    `${effectIndent}useEffect(() => {`,
    `${effectIndent}  setMounted(true);`,
    `${effectIndent}}, []);`,
    "",
  ];
  lines.splice(insertBefore, 0, ...mountEffectLines);

  content = lines.join("\n");

  // Step 6: Wrap the iframe in {mounted && (...)}.
  // Find the <iframe that has ref={playerIframeRef} — handle both single-line
  // (`<iframe ref={playerIframeRef} ...`) and multi-line (`<iframe\n  ref={playerIframeRef}`).
  let iframeOpenIdx = content.indexOf("<iframe ref={playerIframeRef}");
  if (iframeOpenIdx === -1) {
    // Try multi-line: <iframe followed by whitespace/newline then ref={playerIframeRef}
    const multiLineMatch = content.match(/<iframe\s+ref=\{playerIframeRef\}/);
    if (multiLineMatch && multiLineMatch.index !== undefined) {
      iframeOpenIdx = multiLineMatch.index;
    }
  }
  if (iframeOpenIdx === -1) {
    return { status: "no-iframe-found" };
  }
  // Find closing /> or </iframe>
  let iframeCloseIdx = content.indexOf("/>", iframeOpenIdx);
  const iframeFullCloseIdx = content.indexOf("</iframe>", iframeOpenIdx);
  let closingLen = 2;
  if (iframeFullCloseIdx !== -1 && (iframeCloseIdx === -1 || iframeFullCloseIdx < iframeCloseIdx)) {
    iframeCloseIdx = iframeFullCloseIdx;
    closingLen = 9;
  }
  if (iframeCloseIdx === -1) {
    return { status: "no-iframe-close-found" };
  }

  const iframeText = content.substring(iframeOpenIdx, iframeCloseIdx + closingLen);
  const wrappedIframe = `{mounted && (${iframeText})}`;
  content = content.substring(0, iframeOpenIdx) + wrappedIframe + content.substring(iframeCloseIdx + closingLen);

  if (content === orig) {
    return { status: "no-changes" };
  }

  if (!dryRun) {
    fs.writeFileSync(filePath, content, "utf8");
  }
  return { status: "fixed" };
}

const files = findClientFiles(VIDEOS_DIR);
let fixed = 0;
let alreadyPatched = 0;
const errors = [];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const result = patchFile(file);
  if (result.status === "fixed") {
    fixed++;
    console.log(`  ✓ ${rel}`);
  } else if (result.status === "already-patched") {
    alreadyPatched++;
  } else {
    errors.push({ file: rel, ...result });
    console.log(`  ✗ ${rel}: ${result.status}${result.line ? ` (line: ${result.line.trim()})` : ""}`);
  }
}

console.log(`\n${dryRun ? "Would fix" : "Fixed"}: ${fixed}, Already patched: ${alreadyPatched}, Errors: ${errors.length}`);
