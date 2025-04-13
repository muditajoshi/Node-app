const { expect } = require("chai");
const sinon = require("sinon");
const DAL = require("../DAL/postQueries"); // Real DAL module
const postController = require("../post/controller/postController"); // Real controller module

describe("getPosts", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 200 and posts", async () => {
    sinon.stub(DAL, "getAllPosts").resolves([{ title: "Mock Post" }]);

    await postController.getPosts(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith([{ title: "Mock Post" }])).to.be.true;
  });

  it("should return 500 on error", async () => {
    sinon.stub(DAL, "getAllPosts").throws(new Error("DB error"));

    await postController.getPosts(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: "Server Error" })).to.be.true;
  });
});

describe("getPostById", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { id: "1" } };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 200 and posts", async () => {
    const mockPost = {  title: "Mock Post" };
    sinon.stub(DAL, "getPostById").resolves(mockPost);

    await postController.getPostById(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(mockPost)).to.be.true;
  });

  it("should return 404 if post not found", async () => {
    sinon.stub(DAL, "getPostById").resolves(null);

    await postController.getPostById(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: "Post not found" })).to.be.true;
  });

  it("should return 500 on error", async () => {
    sinon.stub(DAL, "getPostById").throws(new Error("DB error"));

    await postController.getPostById(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: "DB error" })).to.be.true;
  });
});


describe("createPost", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {
      title: "Test Title",
      content: "Test content",
      image: "test.jpg",
    },};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 200 and posts", async () => {
    const mockPost = { _id: { toHexString: () => "12345" } }
    sinon.stub(DAL, "createPost").resolves(mockPost);

    await postController.createPost(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith("12345")).to.be.true;
    
  });

  it("should return 500 on error", async () => {
    sinon.stub(DAL, "createPost").throws(new Error("DB error"));

    await postController.createPost(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: "DB error" })).to.be.true;
  });
});

describe("updatePost", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params:{
        id: "12345",
      },
       body: {
      title: "Testing Title",
    },};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 200 and posts", async () => {
    const mockPost = { _id: "12345" }; 
    sinon.stub(DAL, "updatePost").resolves(mockPost);

    await postController.updatePost(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: "Post updated successfully" })).to.be.true;
    
  });

  it("should return 404 if post not found", async () => {
    sinon.stub(DAL, "updatePost").resolves(null);

    await postController.updatePost(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: "Post not found" })).to.be.true;
  });

  it("should return 500 on error", async () => {
    sinon.stub(DAL, "updatePost").throws(new Error("DB error"));

    await postController.updatePost(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: "DB error" })).to.be.true;
  });
});

describe("deletePost", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params:{
        id: "12345",
      },
  };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 200 and posts", async () => {
    const mockPost = { _id: "12345" }; 
    sinon.stub(DAL, "deletePost").resolves(mockPost);

    await postController.deletePost(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: "Post deleted successfully" })).to.be.true;
    
  });
  it("should return 404 if post not found", async () => {
    sinon.stub(DAL, "deletePost").resolves(null);

    await postController.deletePost(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: "Post not found" })).to.be.true;
  });

  it("should return 500 on error", async () => {
    sinon.stub(DAL, "deletePost").throws(new Error("DB error"));

    await postController.deletePost(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: "DB error" })).to.be.true;
  });
});