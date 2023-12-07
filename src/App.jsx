import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import "tailwindcss/tailwind.css";
import "./App.css";

let apiReceived = false;

function App() {
  const initialFormData = {
    id: "",
    title: "",
    content: "",
    image: "",
    category: "",
    tags: "",
    published: false,
  };

  const tags = [
    "Travels and adventures",
    "Health and wellness",
    "Art and culture",
    "Food and recipes",
  ];

  const [postsList, setPostsList] = useState([]);
  const [post, setPost] = useState(initialFormData);
  const [editId, setIdPost] = useState("");

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

  useEffect(() => {
    if (!apiReceived) {
      getPosts();
      apiReceived = true;
    }
  }, []);

  function updatePostsList(newValue, fieldName) {
    const newPost = { ...post };
    newPost[fieldName] = newValue;
    setPost(newPost);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!editId) {
      setPostsList([
        ...postsList,
        {
          ...post,
          id: crypto.randomUUID(),
          image:
            post.image ||
            "https://avante.biz/wp-content/uploads/Desktop-Wallpapers-HD-Widescreen/Desktop-Wallpapers-HD-Widescreen-002.jpg",
          createdAt: new Date(),
          published: true,
        },
      ]);
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

  function handleTags(value) {
    /*     let tags = [...post.tags];

    if (tags.includes(value)) {
      tags = tags.filter((el) => el !== value);
    } else {
      tags.push(value);
    }

    setPost((post) => ({ ...post, tags })); */

    setPost(({ tags, ...post }) => ({
      ...post,
      tags: tags.includes(value)
        ? tags.filter((el) => el !== value)
        : [...tags, value],
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
          onChange={(e) => updatePostsList(e.target.value, "category")}
        >
          <option value="" disabled>
            Choose a category
          </option>
          <option value="Technology and innovations">
            Technology and innovations
          </option>
          <option value="Travels and adventures">Travels and adventures</option>
          <option value="Health and wellness">Health and wellness</option>
          <option value="Art and culture">Art and culture</option>
          <option value="Food and recipes">Food and recipes</option>
          <option value="Finance and investments">
            Finance and investments
          </option>
        </select>
        {tags.map((el) => (
          <label
            className="flex justify-center gap-2"
            key={self.crypto.randomUUID()}
          >
            {el}
            <input
              className="border p-3"
              value={el}
              type="checkbox"
              checked={post.tags.includes(el)}
              onChange={(e) => handleTags(e.target.value)}
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
