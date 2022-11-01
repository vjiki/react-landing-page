import { BlogHeader } from '../../../components/blog/BlogHeader/BlogHeader';
import { FullPost } from '../../../components/blog/FullPost';
import About from '../../../components/trainings/About';
import Canvas from '../../../components/trainings/Canvas';
import Header from '../../../components/trainings/Header';
import LazyShow from '../../../components/trainings/LazyShow';

export default function FullPostPage() {
  return (
    <div className={`bg-background grid gap-y-4 overflow-hidden`}>
      <div className={`relative bg-background`}>
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative z-10 pb-2 bg-background sm:pb-4 md:pb-4 lg:max-w-2xl lg:w-full lg:pb-8 xl:pb-12`}
          >
            <Header />
          </div>
        </div>
      </div>
      <BlogHeader />
      <>
        <FullPost />
        <Canvas />
      </>
      <LazyShow>
        <>
          <About />
        </>
      </LazyShow>
    </div>
  );
}
