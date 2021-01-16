export default `# <%= username %> Awesome List [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

## Table of Contents

<% for(let [language, repositories] of stars) { %>
## <%= language %>

<% for(let repo of repositories) { %>- [<%= repo.full_name %>](<%= repo.html_url %>) - <%= repo.description %>
<% } %>  

<% } %>
`;
