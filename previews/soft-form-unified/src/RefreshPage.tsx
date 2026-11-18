import { useEffect, useState, useRef, type ReactNode, type MouseEvent } from 'react';
import type { Language } from './i18n';
import { lightContent, VIDEO_URL, VIDEO_POSTER, GOOGLE_URL } from './light-content';
import patientImage from './assets/patient-consultation.webp';
import conversationImage from './assets/clinical-conversation-wide.webp';
import result1 from './assets/result-01.webp';
import result2 from './assets/result-02.webp';
import result3 from './assets/result-03.webp';
const Arrow = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>;
const Check = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4L19 7.5" /></svg>;
const ToolGraphic = ({index}:{index:number}) => {
 const paths:Record<number,string[]> = {
  0:['M8 12h24v21H8Z','M15 12V7h10v5','M16 22h8M20 18v8'],
  4:['M14 5h12v18a6 6 0 0 1-12 0Z','M14 11h12','M20 29v7M20 36h9','M18 18h4M20 16v4'],
  1:['M20 4a16 16 0 1 0 16 16H20Z','M25 4v11h11A16 16 0 0 0 25 4Z','M12 31h7'],
  2:['M10 5h10M12 5v19a7 7 0 0 0 14 0V5M22 5h8','M13 20h12','M29 30h7M32.5 26.5v7'],
  3:['M31 7C14 5 7 13 9 24s19 15 22-17Z','M8 34 26 14','M14 27v-8M20 21h8'],
  5:['M4 12c7-7 13 7 20 0s10-3 12-1','M4 21c7-7 13 7 20 0s10-3 12-1','M4 30c7-7 13 7 20 0s10-3 12-1'],
  6:['M10 31h20','M11 25c-8-8 7-9 0-17M20 25c-8-8 7-9 0-17M29 25c-8-8 7-9 0-17'],
  7:['M7 6v27h28','m11 25 7-9 7 4 9-12','M27 8h7v7']
 };
 return <svg className="tool-graphic" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index]?.map((d,i)=><path key={i} d={d}/>)}</svg>;
};
export type RefreshVariant = 'light' | 'original' | 'mobile';
const variantPresentation = {
 light: {className:'theme-light light-refined light-seven',heroImage:patientImage},
 original: {className:'theme-original hero-centered refresh-canonical variant-original',heroImage:conversationImage},
 mobile: {className:'theme-light hero-mobile refresh-canonical variant-mobile',heroImage:patientImage},
} as const;
export default function RefreshPage({initialLanguage='en',variant='light'}:{initialLanguage?:Language;variant?:RefreshVariant}) {
 const presentation=variantPresentation[variant];
 const [language,setLanguage]=useState(initialLanguage);
 const [enhanced,setEnhanced]=useState(false);
 const [tab,setTab]=useState(0);
 const c=lightContent[language];
 const href=(lang:Language)=>`${import.meta.env.BASE_URL}${lang}/`;
 const consultation=`https://wa.me/971509413123?text=${encodeURIComponent(c.consultationMessage)}`;
 const slim=`https://wa.me/971509413123?text=${encodeURIComponent(c.slimMessage)}`;
 const changeLanguage=(e:MouseEvent<HTMLAnchorElement>,lang:Language)=>{if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();setLanguage(lang);history.pushState(null,'',href(lang)+location.hash)};
 useEffect(()=>{setEnhanced(true);if(location.hash==='#slim-trial')setTab(1);const sync=()=>setLanguage(/\/ru\/?$/.test(location.pathname)?'ru':'en');window.addEventListener('popstate',sync);return()=>window.removeEventListener('popstate',sync)},[]);
 useEffect(()=>{document.documentElement.lang=language;document.title=language==='ru'?'Refresh Clinic — медицинское снижение веса в Дубае':'Refresh Clinic — Medical Weight Loss in Dubai'},[language]);
 const tracks=useRef<Record<string,HTMLDivElement|null>>({});
 const [carouselState,setCarouselState]=useState<Record<string,{start:boolean,end:boolean}>>({});
 const updateCarousel=(id:string)=>{const el=tracks.current[id];if(!el)return;const next={start:el.scrollLeft<=2,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-2};setCarouselState(prev=>prev[id]?.start===next.start&&prev[id]?.end===next.end?prev:{...prev,[id]:next});};
 useEffect(()=>{const update=()=>Object.keys(tracks.current).forEach(updateCarousel);const observer=new ResizeObserver(update);Object.values(tracks.current).forEach(el=>{if(el)observer.observe(el)});update();return()=>observer.disconnect();},[]);
 const shift=(id:string,direction:number)=>{const el=tracks.current[id];if(el)el.scrollBy({left:direction*(el.firstElementChild?.getBoundingClientRect().width||el.clientWidth*.8)+direction*18,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
 const carousel=(id:string,label:string,children:ReactNode)=><div className="media-carousel" role="region" aria-label={label}><div className="carousel-toolbar"><p>{language==='ru'?'Листайте, чтобы увидеть больше':'Swipe to see more'}</p><div><button type="button" aria-label={c.previous} disabled={carouselState[id]?.start??true} aria-controls={id} onClick={()=>shift(id,-1)}>←</button><button type="button" aria-label={c.next} disabled={carouselState[id]?.end??false} aria-controls={id} onClick={()=>shift(id,1)}>→</button></div></div><div id={id} className={`carousel-track ${id==='doctors-track'?'doctor-grid':'results-grid'}`} tabIndex={0} onScroll={()=>updateCarousel(id)} ref={el=>{tracks.current[id]=el}} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();shift(id,e.key==='ArrowRight'?1:-1)}}}>{children}</div></div>;
 useEffect(()=>{
  const video=document.querySelector<HTMLVideoElement>('[data-variant] .story-video-frame video');
  if(!video)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync=()=>{if(motion.matches){video.pause();video.autoplay=false;}else{video.autoplay=true;video.muted=true;void video.play().catch(()=>{});}};
  sync();motion.addEventListener('change',sync);return()=>motion.removeEventListener('change',sync);
 },[]);
 const cta=(label=c.consult)=><a className="btn btn-dark" href={consultation} target="_blank" rel="noreferrer">{label}<Arrow/></a>;
 return <main id="top" className={presentation.className} data-variant={variant} data-enhanced={enhanced}>
 <header className="topbar"><a className="wordmark refresh-mark" href="#top" aria-label={c.home}>refresh<span>CLINIC</span></a><span className="language-switcher header-language" role="group" aria-label={c.language}>{(['en','ru'] as Language[]).map(lang=><a key={lang} className={`language-button ${language===lang?'active':''}`} href={href(lang)} hrefLang={lang} aria-current={language===lang?'page':undefined} onClick={e=>changeLanguage(e,lang)}>{lang==='ru'?'РУ':'EN'}</a>)}</span><nav className="header-links">{['results','approach','start'].map((id,i)=><a href={`#${id}`} key={id}>{c.nav[i]}</a>)}</nav><a className="btn btn-yellow header-cta" href={consultation} target="_blank" rel="noreferrer">{c.consult}<Arrow/></a></header>
 <section id="hero" className="hero"><img src={presentation.heroImage} alt={c.photo} fetchPriority="high"/><div className="hero-card"><p className="kicker">REFRESH CLINIC · DUBAI</p><h1><mark>{language==='ru'?'Медицинское снижение веса':'Medical weight loss'}</mark>{language==='ru'?' в Дубае':' in Dubai'}</h1><p className="hero-sub">{c.sub}</p><div className="hero-actions">{cta()}<a className="hero-results-link" href="#slim-trial" onClick={()=>setTab(1)}>{c.slim}<Arrow/></a></div>{GOOGLE_URL?<a className="light-rating" href={GOOGLE_URL} target="_blank" rel="noreferrer"><span aria-hidden="true">★★★★★</span>{c.rating}</a>:<span className="light-rating"><span aria-hidden="true">★★★★★</span>{c.rating}</span>}</div></section>
 <section id="start" className="plans section"><div className="section-heading"><h2>{c.start}</h2></div><div className="programme-picker" role="tablist" aria-label={c.start}>{c.tabs.map((label,i)=><button id={`offer-tab-${i}`} key={i} role="tab" aria-selected={tab===i} aria-pressed={tab===i} aria-controls={i?'slim-trial':'free-consultation'} tabIndex={tab===i?0:-1} onClick={()=>setTab(i)} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?1:1-tab;setTab(next);document.getElementById(`offer-tab-${next}`)?.focus()}}}><strong>{label}</strong></button>)}</div>
 <div id="free-consultation" className="programme-detail" data-selected={tab===0} role={enhanced?'tabpanel':undefined} aria-labelledby="offer-title-0"><div className="programme-detail-heading"><h3 id="offer-title-0">{c.consultationTitle}</h3></div><ul>{c.consultationItems.map(x=><li key={x}><Check/><span>{x}</span></li>)}</ul><p className="offer-note">{c.consultationNote}</p>{cta(c.consultationCta)}</div>
 <div id="slim-trial" className="programme-detail" data-selected={tab===1} role={enhanced?'tabpanel':undefined} aria-labelledby="offer-title-1"><div className="programme-detail-heading"><h3 id="offer-title-1">SLIM Trial</h3><strong>1 599 AED</strong></div><p>{c.slimTitle}</p><ul>{c.slimItems.map(x=><li key={x}><Check/><span>{x}</span></li>)}</ul><p className="offer-note">{c.slimNote}</p><a className="btn btn-dark" href={slim} target="_blank" rel="noreferrer">{c.slimCta}<Arrow/></a></div></section>
 <section id="results" className="results section"><div className="patient-video"><div className="story-video-frame">{VIDEO_URL?<video controls autoPlay muted playsInline loop preload="metadata" poster={VIDEO_POSTER} aria-label={c.videoLabel}><source src={VIDEO_URL}/></video>:<div className="light-video-pending"><span aria-hidden="true">▷</span><p>{c.videoPending}</p></div>}</div><div className="video-story-copy"><h2 className="patient-results-title">{c.results}</h2><strong>{c.loss}</strong><h3>{c.storyPeriod}</h3><p>{c.storyDescription}</p></div></div>{carousel('results-track',c.beforeAfter,[result1,result2,result3].map((src,i)=><figure key={src}><img src={src} alt={`${c.imageAlt} ${i+1}`} loading="lazy"/></figure>))}</section>
 <section id="approach" className="programme-overview section"><div className="section-heading"><h2>{c.comparisonTitle}</h2></div><p className="light-comparison-intro">{c.comparisonIntro}</p><table className="programme-overview-grid light-comparison"><thead><tr>{c.comparison.map(([title],i)=><th scope="col" key={i}><h3>{title}</h3></th>)}</tr></thead><tbody>{c.comparison[0][1].map((_,row)=><tr key={row}>{c.comparison.map(([,points],column)=><td key={column}><p>{points[row]}</p></td>)}</tr>)}</tbody></table></section>
 <section id="tools" className="treatments section"><div className="section-heading"><h2>{c.toolsTitle}</h2></div><div className="treatment-grid compact-tools tools-showcase">{[0,4,1,2,3,5,6,7].map(i=><article key={i} className="tool-visual-card"><details><summary><ToolGraphic index={i}/><div className="tool-summary-copy"><h3>{c.toolNames[i]}</h3><p className="tool-fact">{c.toolHints[i]}</p><span className="tool-detail-cue" aria-hidden="true">⌄</span></div></summary><p className="tool-description">{c.tools[i][1]}</p></details></article>)}</div><p className="results-note">{c.individual}</p></section>
 <section id="faq" className="faq section"><div className="section-heading"><h2>{c.faq}</h2></div><div className="faq-list">{c.faqs.map(([q,a],i)=><details className="faq-item" key={i}><summary aria-controls={`faq-answer-${i}`}>{q}</summary><div className="answer" id={`faq-answer-${i}`}>{a}</div></details>)}</div></section>
 <section id="consultation" className="compact-consultation final-editorial"><div className="final-editorial-copy"><p className="label">REFRESH CLINIC · DUBAI</p><h2>{c.final}</h2><p>{c.finalSub}</p>{cta()}<span>{c.location}</span></div><figure className="final-editorial-photo"><img src={`${import.meta.env.BASE_URL}assets/consultation-editorial.jpeg`} alt={language==='ru'?'Две женщины в интерьере':'Two women in an interior'} loading="lazy"/></figure></section>
 <footer><a className="wordmark refresh-mark" href="#top">refresh<span>CLINIC</span></a><p>{c.location}</p><small>© 2026 Refresh Clinic. {c.footer}</small></footer>
 </main>;
}
