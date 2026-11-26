type ProductProps = {
  title: string;
  price: number;
  thumbnail: string;
};

export default function ProductCard({

  title,
  price,
  thumbnail,

}: ProductProps) {

  return (

    <div className="rounded-lg border p-4">

      <img
        src={thumbnail}
        alt={title}
        className="mb-3 h-40 w-40 object-cover"
      />

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p>
        ${price}
      </p>

    </div>

  );

}