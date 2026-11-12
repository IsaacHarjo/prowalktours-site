import type { GuideFaq } from '../../lib/guides/types';
import CheckedNote from './CheckedNote';
import GuideDisclosure from './GuideDisclosure';
import GuideSectionHeading from './GuideSectionHeading';

const sourceClass = 'inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4 hover:text-[#25382f]';

export default function GuideFaqs({ city, questions }: { city: string; questions: GuideFaq[] }) {
  return <section id="guide-questions" aria-labelledby="questions-heading" className="mx-auto max-w-7xl scroll-mt-[var(--guide-scroll-offset,5rem)] px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
    <GuideSectionHeading id="questions-heading" eyebrow="A little more about the town" title={`${city} questions & answers`} icon="questions" />
    <div className="mt-7 space-y-3">
      {questions.map(question => <GuideDisclosure key={question.question} title={question.question}>
        {question.kind && <p className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${question.kind === 'mine' ? 'bg-[#f4e4bc] text-[#65543b]' : 'bg-[#eaf0e8] text-[#526258]'}`}>{question.kind === 'mine' ? 'My advice' : 'From the official website'}</p>}
        <div className="max-w-3xl space-y-3 text-sm leading-7 text-[#526258]">{question.answer.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        {question.items && <ul className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">{question.items.map(item => <li key={item.title}>
          <h3 className="font-semibold text-[#25382f]">{item.title}</h3>
          <p className="mt-1 text-sm leading-7 text-[#526258]">{item.text}</p>
          {item.source && <a href={item.source.href} target="_blank" rel="noreferrer" className={sourceClass}>{item.source.label} ↗</a>}
        </li>)}</ul>}
        {question.source && <a href={question.source.href} target="_blank" rel="noreferrer" className={sourceClass + ' mt-2'}>{question.source.label} ↗</a>}
        {question.checkedOn && <CheckedNote on={question.checkedOn} />}
        {question.official && <aside aria-label={question.official.label} className="mt-5 max-w-3xl rounded-xl border border-[#dce1d6] bg-[#f5f6f1] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#526258]">{question.official.label}</p>
          <p className="mt-2 text-sm leading-7 text-[#526258]">{question.official.text}</p>
          <div className="flex flex-wrap gap-x-5">{question.official.sources.map(source => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className={sourceClass}>{source.label} ↗</a>)}</div>
          <CheckedNote on={question.official.checkedOn} />
        </aside>}
      </GuideDisclosure>)}
    </div>
  </section>;
}
