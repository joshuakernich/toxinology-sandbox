import { h } from 'preact';
import style from './shared.css';

const GalleryImage = ({img,onImage}) => (
  <img class={style.galleryImage} onclick={()=> onImage(img)} src={img} height='150'/>
)

const Gallery = ({gallery,onImage}) => (
  <galleryContainer>
    { gallery?.map(img => <GalleryImage onImage={onImage} img={img}/>) }
  </galleryContainer>
);

export default Gallery;

