POST_TYPE=$1
TITLE=$2

if [[ $POST_TYPE == "" || $TITLE == "" ]]; then
  echo "Provide a post type and title"
  exit 0
fi

BASE_DIR="$HOME/Projects/mootook.github.io/collections/_posts"
cd=$BASE_DIR
RAW_DATE=$(date)
DATE=$(date +'%Y-%m-%d')
FILE="$DATE-$TITLE.md"

set_jekyll_info() {
  echo "---" >> $FILE
  echo "layout: post" >> $FILE
  echo "title: $TITLE" >> $FILE
  echo "date: $RAW_DATE" >> $FILE
  echo "category: $POST_TYPE" >> $FILE
  echo "permalink: /$POST_TYPE-$TITLE" >> $FILE
  echo "active: true" >> $FILE
  echo "---" >> $FILE
}

if [[ $POST_TYPE == "design" || $POST_TYPE == "engineering"  || $POST_TYPE == "notes" ]]; then
  echo "Created a design blog post at current date, with $FILE as the title."
  cd "$BASE_DIR/$POST_TYPE"
  touch $FILE
  set_jekyll_info
else
  echo "Could not find directory with post type $POST_TYPE"
fi
