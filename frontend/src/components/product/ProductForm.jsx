import Button from "../common/Button.jsx";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  stockQuantity: 1,
  category: "",
  material: "",
  color: "",
  style: "",
  roomType: "",
  width: "",
  height: "",
  depth: "",
  imageUrl: "",
  status: "ACTIVE",
};

export function buildProductFormState(product = {}) {
  return {
    ...emptyProduct,
    ...product,
    price: product.price ?? "",
    stockQuantity: product.stockQuantity ?? 1,
    width: product.width ?? "",
    height: product.height ?? "",
    depth: product.depth ?? "",
    imageUrl: product.imageUrl ?? "",
    status: product.status ?? "ACTIVE",
  };
}

function toOptionalNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  return Number(value);
}

export function toProductPayload(form) {
  return {
    name: form.name.trim(),
    description: form.description.trim(),
    price: Number(form.price),
    stockQuantity: Number(form.stockQuantity),
    category: form.category.trim(),
    material: form.material.trim(),
    color: form.color.trim(),
    style: form.style.trim(),
    roomType: form.roomType.trim(),
    width: toOptionalNumber(form.width),
    height: toOptionalNumber(form.height),
    depth: toOptionalNumber(form.depth),
    imageUrl: form.imageUrl.trim(),
    status: form.status,
  };
}

function ProductForm({ value, onChange, onSubmit, loading, submitLabel = "Save Product", showStatus = false }) {
  function updateField(name, fieldValue) {
    onChange({
      ...value,
      [name]: fieldValue,
    });
  }

  return (
    <form className="shop-form" onSubmit={onSubmit}>
      <div className="shop-form-grid">
        <label>
          Product name
          <input
            value={value.name}
            onChange={(event) => updateField("name", event.target.value)}
            maxLength="200"
            required
          />
        </label>

        <label>
          Category
          <input
            value={value.category}
            onChange={(event) => updateField("category", event.target.value)}
            maxLength="100"
            placeholder="Sofa, Table, Chair..."
          />
        </label>

        <label>
          Price
          <input
            type="number"
            min="1"
            value={value.price}
            onChange={(event) => updateField("price", event.target.value)}
            required
          />
        </label>

        <label>
          Stock
          <input
            type="number"
            min={showStatus ? "0" : "1"}
            value={value.stockQuantity}
            onChange={(event) => updateField("stockQuantity", event.target.value)}
            required
          />
        </label>

        <label>
          Material
          <input value={value.material} onChange={(event) => updateField("material", event.target.value)} maxLength="100" />
        </label>

        <label>
          Color
          <input value={value.color} onChange={(event) => updateField("color", event.target.value)} maxLength="100" />
        </label>

        <label>
          Style
          <input value={value.style} onChange={(event) => updateField("style", event.target.value)} maxLength="100" />
        </label>

        <label>
          Room type
          <input value={value.roomType} onChange={(event) => updateField("roomType", event.target.value)} maxLength="100" />
        </label>

        <label>
          Width
          <input type="number" min="0" value={value.width} onChange={(event) => updateField("width", event.target.value)} />
        </label>

        <label>
          Height
          <input type="number" min="0" value={value.height} onChange={(event) => updateField("height", event.target.value)} />
        </label>

        <label>
          Depth
          <input type="number" min="0" value={value.depth} onChange={(event) => updateField("depth", event.target.value)} />
        </label>

        {showStatus && (
          <label>
            Status
            <select value={value.status} onChange={(event) => updateField("status", event.target.value)}>
              <option value="ACTIVE">Active</option>
              <option value="HIDDEN">Hidden</option>
              <option value="OUT_OF_STOCK">Out of stock</option>
            </select>
          </label>
        )}
      </div>

      <label>
        Image URL
        <input
          value={value.imageUrl}
          onChange={(event) => updateField("imageUrl", event.target.value)}
          maxLength="2000"
          placeholder="https://..."
        />
      </label>

      <label>
        Description
        <textarea
          value={value.description}
          onChange={(event) => updateField("description", event.target.value)}
          maxLength="5000"
          rows="5"
        />
      </label>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}

export default ProductForm;
