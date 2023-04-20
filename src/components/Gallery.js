import { h } from 'preact';
import style from './shared.css';

const GalleryImage = ({img,onImage}) => (

  <galleryImage>
    <img onclick={()=> onImage(img)} src={img.url} height='150'/>
    {img.caption?<captionContainer>{img.caption}</captionContainer>:undefined}
  </galleryImage>
)

const Gallery = ({gallery,onImage}) => (
  <galleryContainer>
    { gallery?.map(img => <GalleryImage onImage={onImage} img={img}/>) }
  </galleryContainer>
);

export default Gallery;

