const postFormHandler = async (event) => {
  event.preventDefault();

  const blogTitle = document.querySelector(".inputTitle").value.trim();
  const blogText = document.querySelector(".inputText").value.trim();

  if (blogTitle && blogText) {
    const response = await fetch("/api/blogRoutes", {
      method: "POST",
      body: JSON.stringify({ blogTitle, blogText }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);
