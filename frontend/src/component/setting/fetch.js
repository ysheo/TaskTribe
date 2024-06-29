const Get = async (url) => {
  const SignUpJson = await fetch(url, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((err) => {
      alert(err);
    });

  return SignUpJson;
};

const Post = async (url, params) => {
  const SignUpJson = await fetch(url, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return response;
    })
    .then((json) => {
      return json;
    })
    .catch((err) => {
      alert(err);
    });

  return SignUpJson;
};

const ProfilePost = async (url, params) => {
  const SignUpJson = await fetch(url, {
    method: "Post",
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
    },
    body: params,
  })
    .then((response) => {
      return response;
    })
    .then((json) => {
      return json;
    })
    .catch((err) => {
      alert(err);
    });

  return SignUpJson;
};

export { Get, Post, ProfilePost };
