SITE = "src/site.yml"

all:	site

npm:
	npm install --no-optional

sass:
	node_modules/.bin/node-sass src/themes/algoneer/assets/scss/main.scss src/themes/algoneer/static/css/main.css

babel:
	node_modules/.bin/babel src/**/*.es6 --out-dir "."

site: sass babel
	beam up --site $(SITE)

clean:
	rm -rf build/*

watch: site
	@which inotifywait || (echo "Please install inotifywait";exit 2)
	@while true ; do \
		inotifywait -r src -e create,delete,move,modify || break; \
		$(MAKE) || break; \
	done


