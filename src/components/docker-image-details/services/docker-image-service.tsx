class DockerImageService {
  public getDockerImage = async (id: number) => {
    const result = await fetch("http://localhost:3000/api/docker-images/" + id)
      .then((res) => res.json())
      .then((json) => {
        var results = json;
        return results;
      });
    return result;
  };
}

export default DockerImageService;
