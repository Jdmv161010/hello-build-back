function parseGithubResponse(repositories, favRepos) {
  return repositories.map((repo) => {
    const { id, name, private, html_url, description, ...rest } = repo;

    const isFavorite = favRepos.find((repo) => repo === String(id)) || false;

    return {
      id,
      name,
      privacy: private,
      url: html_url,
      description,
      isFavorite: !!isFavorite,
    };
  });
}

module.exports = parseGithubResponse;
