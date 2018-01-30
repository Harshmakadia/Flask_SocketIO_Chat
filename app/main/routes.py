import uuid
from flask import session, redirect, url_for, render_template, request
from . import main

@main.route('/login', methods=['POST'])
def login():
    """"Login form to enter a room."""
    session['user_id'] = str(uuid.uuid1())
    session['name'] = request.form.get('name')
    session['mobile'] = request.form.get('mobile')
    session['room'] = "Mtech"
    return redirect(url_for('.chat'))

@main.route('/', methods=['GET'])
def index():
    """"Login form to enter a room."""
    user_id = session.get('user_id', '')
    user_name = session.get('name', '')
    mobile = session.get('mobile', '')
    room = session.get('room', '')
    return render_template('index.html', user_name=user_name, mobile=mobile, room=room, user_id=user_id)

@main.route('/chat')
def chat():
    """Chat room. The user's name and room must be stored in
    the session."""
    user_id = session.get('user_id', '')
    name = session.get('name', '')
    mobile = session.get('mobile', '')
    room = session.get('room', '')
    if name == '' or room == '' or user_id == '' or mobile == '':
        return redirect(url_for('.index'))
    return render_template('chat.html', name=name, room=room, mobile=mobile, user_id=user_id)