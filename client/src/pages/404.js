const Custom404 = () => {
  return (
    <div>
      <h1>Denne side kunne desværre ikke blive fundet</h1>
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

export default Custom404;
