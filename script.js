(()=>{
const dialog=document.querySelector('.case-lightbox'),pics=[...document.querySelectorAll('.case-photo-open')];let active=0,last;
const show=i=>{active=(i+pics.length)%pics.length;const source=pics[active].querySelector('img'),target=dialog.querySelector('img');target.src=source.src;target.alt=source.alt;dialog.querySelector('.count').textContent=`${active+1} / ${pics.length}`;};
pics.forEach((b,i)=>b.addEventListener('click',()=>{last=b;show(i);dialog.showModal();}));
dialog.querySelector('.case-lightbox-close').addEventListener('click',()=>dialog.close());dialog.querySelector('.prev').addEventListener('click',()=>show(active-1));dialog.querySelector('.next').addEventListener('click',()=>show(active+1));dialog.addEventListener('close',()=>last?.focus());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(active+1);if(e.key==='ArrowLeft')show(active-1)});
const video=document.querySelector('video'),frame=document.querySelector('.video-frame');
// Keep the patient poster visible until an intentional play, and restore it at the end.
const resetVideo=()=>{frame.classList.remove('started','playing');video.controls=false;video.currentTime=0};
frame.classList.add('ready');video.controls=false;
frame.querySelector('.video-start').addEventListener('click',()=>video.play().catch(()=>resetVideo()));
video.addEventListener('play',()=>{frame.classList.add('started','playing');video.controls=true});
video.addEventListener('pause',()=>frame.classList.remove('playing'));
video.addEventListener('ended',resetVideo);
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;if(reduced){video.autoplay=false;video.pause()}
const sticky=document.querySelector('.mobile-sticky');let heroVisible=true,consultationVisible=false,enquiryVisible=false;const updateSticky=()=>sticky.classList.toggle('visible',!heroVisible&&!consultationVisible&&!enquiryVisible);new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;updateSticky()},{threshold:0}).observe(document.querySelector('.hero'));const consultation=document.querySelector('.consultation-panel');if(consultation)new IntersectionObserver(entries=>{consultationVisible=entries[0].isIntersecting;updateSticky()},{threshold:0}).observe(consultation);const enquiry=document.querySelector('.next-step');if(enquiry)new IntersectionObserver(entries=>{enquiryVisible=entries[0].isIntersecting;updateSticky()},{threshold:0}).observe(enquiry);
const track=document.querySelector('.photo-track'),galleryPrev=document.querySelector('.gallery-prev'),galleryNext=document.querySelector('.gallery-next');
const updateGallery=()=>{galleryPrev.disabled=track.scrollLeft<2;galleryNext.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-3};
const moveGallery=direction=>track.scrollBy({left:direction*(track.firstElementChild.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap)),behavior:reduced?'auto':'smooth'});
galleryPrev.addEventListener('click',()=>moveGallery(-1));galleryNext.addEventListener('click',()=>moveGallery(1));track.addEventListener('scroll',updateGallery,{passive:true});window.addEventListener('resize',updateGallery);requestAnimationFrame(updateGallery);

document.querySelectorAll('.chapter-controls[data-carousel]').forEach(control=>{const track=document.getElementById(control.dataset.carousel),items=[...track.children],count=control.querySelector('.carousel-count'),prev=control.querySelector('.carousel-prev'),next=control.querySelector('.carousel-next');const update=()=>{let i=0,best=Infinity;items.forEach((item,n)=>{const dist=Math.abs(item.offsetLeft-track.offsetLeft-track.scrollLeft);if(dist<best){best=dist;i=n}});const fits=track.scrollWidth<=track.clientWidth+3;const atEnd=track.scrollLeft+track.clientWidth>=track.scrollWidth-3;if(atEnd&&!fits)i=items.length-1;count.textContent=fits?(control.dataset.carousel==='doctor-track'?`${items.length} doctors`:`${items.length} reviews`):`${i+1} / ${items.length}`;control.hidden=fits&&control.dataset.carousel==='doctor-track';prev.disabled=fits||track.scrollLeft<2;next.disabled=fits||atEnd};const move=dir=>track.scrollBy({left:dir*(items[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap||0)),behavior:reduced?'auto':'smooth'});prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));track.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);requestAnimationFrame(update)});
for(const selector of ['.tool-detail','.plan'])document.querySelectorAll(selector).forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)document.querySelectorAll(selector).forEach(other=>{if(other!==detail)other.open=false})}));
})();

// Preserve the original section bounds while refining the contents inside them.
// The original stylesheet stays the source of truth for responsive and expanded
// layouts. Measure it synchronously, then restore the refinement before paint.
(() => {
  const stylesheet = document.querySelector('#refinement-styles');
  if (!stylesheet) return;
  const sections = [...document.querySelectorAll('body > header, main > section, main > .benefit-strip, body > footer')];
  const doctorControls = document.querySelector('[data-carousel="doctor-track"]');
  let pending = false;
  const measure = () => {
    pending = false;
    const controlsHidden = doctorControls.hidden;
    let heights;
    try {
      stylesheet.disabled = true;
      doctorControls.hidden = false;
      heights = sections.map(section => section.getBoundingClientRect().height);
    } finally {
      stylesheet.disabled = false;
      doctorControls.hidden = controlsHidden;
    }
    sections.forEach((section, index) => {
      section.style.setProperty('--preserved-section-height', `${heights[index]}px`);
      section.classList.add('preserve-bounds');
    });
  };
  const schedule = () => {
    if (!pending) { pending = true; requestAnimationFrame(measure); }
  };
  measure();
  document.fonts.ready.then(schedule);
  window.addEventListener('resize', schedule);
  document.addEventListener('toggle', schedule, true);
  document.addEventListener('load', event => {
    if (event.target.tagName === 'IMG') schedule();
  }, true);
  document.querySelector('video').addEventListener('loadedmetadata', schedule);
  const form = document.querySelector('#enquiry-builder');
  form.addEventListener('click', schedule);
  form.addEventListener('change', schedule);
  form.addEventListener('submit', schedule);
})();
