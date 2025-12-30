import mockProducts from "../../data/mockProducts";

export default function handler(req, res) {
  res.status(200).json(mockProducts);
}
