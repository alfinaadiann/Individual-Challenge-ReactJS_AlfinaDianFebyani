import PropTypes from "prop-types";
import Card from "../Card/Card";

export default function CardList({ products }) {
  return (
    <>
      {products.length > 0 ? (
        products.map((prod, index) => (
          <Card product={prod} index={index} key={prod.id ?? index} />
        ))
      ) : (
        <p className="text-center py-4 col-span-4">No Product Found.</p>
      )}
    </>
  );
}

CardList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
