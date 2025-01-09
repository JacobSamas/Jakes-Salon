const Card = ({ title, value }) => {
    return (
      <div className="p-6 bg-card text-card-foreground rounded-lg shadow-md flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
    );
  };
  
  export default Card;
  