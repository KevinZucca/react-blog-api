import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import "tailwindcss/tailwind.css";
import "./App.css";

let apiReceived = false;

function App() {
  const initialFormData = {
    title: "",
    content: "",
    image: "",
    category: "",
    tags: [],
    published: true,
  };

  const [postsList, setPostsList] = useState([]);
  const [post, setPost] = useState(initialFormData);
  const [editId, setIdPost] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState([]);

  async function getPosts() {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const posts = await response.json();
      // console.log("Dati dalla chiamata API:", posts);
      setPostsList(posts);
    } catch (error) {
      console.error("Errore nella chiamata API:", error);
    }
  }

  async function getCategories() {
    try {
      const response = await fetch("http://localhost:3000/categories");
      const category = await response.json();
      setCategory(category);
    } catch (error) {
      console.error("Errore nella chiamata API:", error);
    }
  }

  async function getTags() {
    try {
      const response = await fetch("http://localhost:3000/tags");
      const tags = await response.json();
      setTags(tags);
    } catch (error) {
      console.error("Errore nella chiamata API:", error);
    }
  }

  useEffect(() => {
    if (!apiReceived) {
      getPosts();
      getCategories();
      getTags();
      apiReceived = true;
    }
  }, []);

  function updatePostsList(newValue, fieldName) {
    const newPost = { ...post };
    newPost[fieldName] = newValue;
    setPost(newPost);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    console.log("Body of the request:", JSON.stringify(post));
    if (!editId) {
      const response = await fetch("http://localhost:3000/posts/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...post,
          image: post.image,
        }),
      });

      setPost(initialFormData);
    } else {
      setPostsList(
        postsList.map((el) =>
          el.id == editId
            ? {
                id: editId,
                ...post,
              }
            : el
        )
      );

      setPost(initialFormData);
      setIdPost("");
    }
  }

  function handleEditPost(postId) {
    const post = postsList.find((el) => el.id === postId);

    if (!post) {
      return;
    }

    setPost({
      title: post.title,
      content: post.content,
      image: post.image,
      category: post.category,
      tags: post.tags,
      published: post.published,
    });

    setIdPost(postId);
  }

  function handleCategory(id) {
    setPost((currentPost) => ({
      ...currentPost,
      category: parseInt(id, 10),
    }));
  }

  function handleTags(id) {
    /*     let tags = [...post.tags];

    if (tags.includes(value)) {
      tags = tags.filter((el) => el !== value);
    } else {
      tags.push(value);
    }

    setPost((post) => ({ ...post, tags })); */

    setPost(({ tags, ...post }) => ({
      ...post,
      tags: tags.includes(id) ? tags.filter((el) => el !== id) : [...tags, id],
    }));
  }

  return (
    <>
      <form onSubmit={handleFormSubmit} className="text-center flex flex-col">
        <label htmlFor="post"></label>
        <input
          className="border p-3"
          value={post.title}
          type="text"
          placeholder="Insert the title of the post"
          onChange={(e) => updatePostsList(e.target.value, "title")}
        />
        <input
          className="border p-3"
          value={post.content}
          type="text"
          placeholder="Insert the content"
          onChange={(e) => updatePostsList(e.target.value, "content")}
        />
        <input
          className="border p-3"
          value={post.image}
          type="text"
          placeholder="Insert the url of the image"
          onChange={(e) => updatePostsList(e.target.value, "image")}
        />
        <select
          className="border p-3 select-transparent"
          value={post.category}
          type="select"
          onChange={(e) => handleCategory(e.target.value, "category")}
        >
          <option value="" disabled>
            Choose a category
          </option>
          {category.map((el, index) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        {tags.map((el) => (
          <label
            className="flex justify-center gap-2"
            key={self.crypto.randomUUID()}
          >
            {el.name}
            <input
              className="border p-3"
              value={el.name}
              type="checkbox"
              checked={post.tags.includes(el.id)}
              onChange={() => handleTags(el.id)}
            />
          </label>
        ))}

        <button
          type="submit"
          className="border p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-800 w-20 m-auto mt-5"
        >
          {editId.length > 0 ? "Save" : "Create"}
        </button>
      </form>

      <PostList
        posts={postsList}
        setPostsList={setPostsList}
        handleEditPost={handleEditPost}
      />
    </>
  );
}

export default App;
