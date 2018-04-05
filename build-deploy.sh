rm -rf docs/

ng build --prod --output-path docs --base-href "https://immannino.github.io/FantasyGolfLeague/"

cd ./doc/ && cp index.html ./404.html && cd ../

git add doc/ && git commit -m "Release commit" && git push origin master