export default function handler(req, res) {
  res.status(200).json([
    {
      id: "1",
      title: "Sample Product",
      price: "£29.99",
      image: "https://via.placeholder.com/300",
      link: "#"
    }
  ]);
}
