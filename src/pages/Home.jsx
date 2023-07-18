import Question from '../components/Question';
import RandomQuestion from '../components/RandomQuestion';

export default function Home() {
  return (
    <>
      {/* Home 입니다. */}
      {/* {data} */}
      <RandomQuestion />
      <Question />
    </>
  );
}
