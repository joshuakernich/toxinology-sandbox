import { h } from 'preact';
import style from './shared.css';

const GalleryImage = ({img,onImage}) => (

  <galleryImage>
    <img class={style.galleryImage} onclick={()=> onImage(img)} src={img.url} height='150'/>
    <captionContainer>{img.caption}</captionContainer>
  </galleryImage>
)

const Gallery = ({gallery,onImage}) => (
  <galleryContainer>
    { gallery?.map(img => <GalleryImage onImage={onImage} img={img}/>) }
  </galleryContainer>
);

export default Gallery;

