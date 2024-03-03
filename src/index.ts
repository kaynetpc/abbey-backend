import App from "./app";


const PORT = process.env.PORT || 5000;

App.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
