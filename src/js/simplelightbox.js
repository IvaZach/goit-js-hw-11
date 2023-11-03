import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function funcLightbox() {
  const lightbox = new SimpleLightbox('.link', {
    captionsData: 'alt',
    captionDelay: 200,
    captionPosition: 'bottom',
  });

  lightbox.on('show.simplelightbox');
  lightbox.on('error.simplelightbox', function (e) {
    console.log(e);
  });
}
