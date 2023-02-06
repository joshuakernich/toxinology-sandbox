import { h } from 'preact';
import style from './shared.css';

const GalleryImage = () => (
  <img class={style.galleryimage} src='' width='150' height='150'/>
)

const Gallery = ({gallery}) => (
  <div class={style.gallery}>
    { gallery?.map(img => <GalleryImage img={img}/>) }
  </div>
);

export default Gallery;

