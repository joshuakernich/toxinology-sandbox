import { h } from 'preact';
import style from './shared.css';

const GalleryImage = () => (
  <img class={style.galleryimage} src='' width='150' height='150'/>
)

const Gallery = (props) => (
  <div class={style.gallery}>
    <GalleryImage/>
    <GalleryImage/>
    <GalleryImage/>
    <GalleryImage/>
    <GalleryImage/>
    <GalleryImage/>
  </div>
);

export default Gallery;

