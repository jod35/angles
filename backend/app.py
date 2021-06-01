from flask import Flask,jsonify,request,make_response
from models import Article,sa
from marshmallow import fields,Schema
import os


base_dir=os.path.dirname(os.path.realpath(__file__))

app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]='sqlite:///'+os.path.join(base_dir,'site.db')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False

sa.init_app(app)



class ArticleSchema(Schema):
    username=fields.String(required=True,error="Must be a number")
    email=fields.String(required=True)



@app.route('/articles',methods=['GET'])
def get_all_articles():
    articles=Article.query.order_by(Article.id).all()
    article_data=ArticleSchema(many=True).dump(articles)

    return make_response(jsonify(article_data))



@app.route('/articles',methods=['POST'])
def create_an_article():
    data=request.get_json()

    new_article=Article(username=data.get('username'), email=data.get('email'))

    sa.session.add(new_article)

    sa.session.commit()

    article_data=ArticleSchema().dump(new_article)
    
    return make_response(jsonify(article_data))

@app.route('/article/<int:id>',methods=['GET'])
def get_an_individual_article(id):
    article=Article.query.get_or_404(id)

    article_data=ArticleSchema().dump(article)

    return make_response(jsonify(article_data))


@app.route('/article/<int:id>',methods=['PUT'])
def update_article(id):
    article_to_update=Article.query.get_or_404(id)

    data=request.get_json()

    article_to_update.username=data.get('username')

    article_to_update.email=data.get('email')

    return make_response(jsonify(article_to_update))


@app.route('/article/<int:id>',methods=['DELETE'])
def delete_article(id):
    article_to_delete=Article.query.get_or_404(id)

    sa.session.delete(article_to_delete)

    article_data=ArticleSchema().dump(article_to_delete)

    return make_response(jsonify(article_data))


@app.shell_context_processor
def make_shell_context():
    return {
        'db':sa,
        'Article':Article
    }


@app.errorhandler(404)
def not_found(error):
    return jsonify({"message":"Resource not found"})

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({"message":"Server error"})


if __name__ == '__main__':
    app.run(debug=True)