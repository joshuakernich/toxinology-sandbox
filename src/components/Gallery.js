import { h } from 'preact';
import style from './shared.css';

const GalleryImage = ({img,onImage}) => (
  <img onclick={()=> onImage(img)} class={style.galleryimage} src={img} height='150'/>
)

const Gallery = ({gallery,onImage}) => (
  <div class={style.gallery}>
    { gallery?.map(img => <GalleryImage onImage={onImage} img={img}/>) }
  </div>
);

export default Gallery;

