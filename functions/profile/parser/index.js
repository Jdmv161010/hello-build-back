function parserRepositoriesResponse(repositories) {
  return repositories.map((repo) => {
    const { id, name, private, html_url, description, ...rest } = repo;

    return { id, name, private, html_url, description };
  });
}

module.exports = parserRepositoriesResponse;
