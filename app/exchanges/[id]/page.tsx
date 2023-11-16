interface PageProps {
    params: {
      id: string;
    };
  }
  
  const Page: React.FC<PageProps> = ({ params: { id } }) => {
    return (
      <>
        <h1 className="text-center">Page ID: {id}</h1>
      </>
    );
  };
  
  export default Page;
  ``
  