const Custom500 = () => {
  return (
    <div>
      <h1>Der opstod en fejl fra serverens side.</h1>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      userTypes: ["user", "admin", "unassigned"],
    },
  };
}

export default Custom500;
