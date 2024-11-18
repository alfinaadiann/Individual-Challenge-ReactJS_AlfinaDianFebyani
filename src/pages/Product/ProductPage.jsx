import { useState, useEffect } from "react";
import getAllProducts from "../../services/getAllProducts";
import CardList from "../../components/CardList/CardList";
import Navbar from "../../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";

export default function ProductPage() {
  const [products, setProducts] = useState(getAllProducts());
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    filterProducts(searchQuery, category);
  }, [searchQuery, category]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const filterProducts = (query, category) => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  };

  const RadioButtonOpts = [
    { label: "All", value: "all" },
    { label: "Men's", value: "Men's" },
    { label: "Women's", value: "Women's" },
  ];

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton
            options={RadioButtonOpts}
            defaultValue={"all"}
            onChange={handleCategoryChange}
          />
        </div>
      </div>
      <section className="container px-24 py-4">
        <main className="grid grid-cols-4 gap-4">
          <CardList products={filteredProducts} />
        </main>
      </section>
    </>
  );
}
