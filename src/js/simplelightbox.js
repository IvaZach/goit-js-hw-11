import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function funcSimpleLightbox() {
  const lightbox = new SimpleLightbox('.link', {
    captionsData: 'alt',
    captionDelay: 200,
    captionPosition: 'bottom',
  });
  lightbox.refresh();
  lightbox.on('show.simplelightbox');
  lightbox.on('error.simplelightbox', function (e) {
    console.log(e);
  });
}
