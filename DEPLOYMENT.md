# GitHub Pages

The GitHub Actions workflow builds both Jekyll projects and publishes one Pages artifact:

- Main site: https://rilagames.github.io/rila-site/
- Wiki: https://rilagames.github.io/rila-site/wiki/

## First deployment

1. Open repository **Settings → Pages** and select **GitHub Actions** as the build source.
2. Merge the Pages changes into `main`. The **GitHub Pages** workflow builds and deploys the site. Later pushes to `main` deploy automatically; pull requests only build.
3. Check the workflow's deployment URL after the `deploy` job succeeds.


The workflow gets the production URL and base path from GitHub Pages. It places the wiki under `/wiki` and overrides its return link to point to the main site.

## Local build

Use Ruby 3.1 and Bundler 2.2.16, matching the workflow:

```sh
cd uo-jekyll
bundle install
bundle exec jekyll build --destination ../_pages
cd ../uo-wiki
bundle install
bundle exec jekyll build --destination ../_pages/wiki
```

The checked-in configs use the project paths shown above. To preview the main site with Jekyll, run `bundle exec jekyll serve` from `uo-jekyll`; preview the wiki separately from `uo-wiki`. Do not commit `_pages` output.
