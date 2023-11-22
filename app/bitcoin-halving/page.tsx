import dynamic from 'next/dynamic';

const DynamicCountdown = dynamic(() => import('@/components/readyToUse/Countdown/Bitcoin'), { ssr: false });

const Home: React.FC = () => {
  const targetDate = '2024-04-25T00:00:00';

  return (
    <div>
      <DynamicCountdown targetDate={targetDate} />
    </div>
  );
};

export default Home;
