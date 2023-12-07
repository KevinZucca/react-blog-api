export default function PostList({ posts, setPostsList, handleEditPost }) {
  function removePost(idToRemove) {
    setPostsList(posts.filter((post) => post.id !== idToRemove));
  }

  return (
    <>
      <div className="border rounded h-1/2 m-auto mt-40 p-3 w-full">
        <ul className="flex flex-row justify-center w-full flex-wrap gap-y-10 m-auto">
          {posts.map((post) => (
            <li
              className="flex flex-row justify-center items-center w-1/3 mb-4"
              key={post.id}
            >
              <div className="relative grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
                <div
                  style={{
                    backgroundImage: `url(${post.image ? post.image.src : ""})`,
                  }}
                  className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('${post.image}')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none`}
                >
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"></div>
                </div>
                <div className="relative p-6 py-14 px-6 md:px-12">
                  <div className="text-sm text-white py-1">
                    {post.tags
                      ? post.tags.map((tag) => (
                          <span key={tag.id}>{tag.name} </span>
                        ))
                      : "no tags"}
                  </div>
                  <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                    {post.title}
                  </h2>
                  <p className="mb-4 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-400 antialiased">
                    {post.content}
                  </p>
                  <p className="mb-4 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-400 antialiased">
                    {post.category ? post.category.name : "no category"}
                  </p>

                  <span className="flex gap-3 justify-center">
                    <button
                      className="w-5 h-5 flex justify-center items-center"
                      onClick={() => handleEditPost(post.id)}
                    >
                      <img src="/imgs/pencil-svgrepo-com.svg" alt="" />
                    </button>
                    <button
                      className="bg-red-400 w-5 h-5 flex justify-center items-center"
                      onClick={() => removePost(post.id)}
                    >
                      x
                    </button>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
