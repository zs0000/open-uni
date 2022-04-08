INSERT INTO users (user_username, user_email, user_password, user_role) VALUES ('BarbM', 'BarbM@email.com', 'barb', 'professor');

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_firstname VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    user_username VARCHAR(255) UNIQUE NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(255) NOT NULL,
    user_picture VARCHAR(255),
);




CREATE TABLE courses (
 course_id SERIAL PRIMARY KEY,
 professor VARCHAR(255)  NOT NULL,
 professor_username VARCHAR(255)  NOT NULL,
 course_title VARCHAR(255) NOT NULL,
 course_description TEXT NOT NULL,
 course_category VARCHAR(100),
 course_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 course_capacity INT NOT NULL,
 course_tag VARCHAR(100) NOT NULL
);



CREATE TABLE studentsjoined (
    course_id INT REFERENCES courses (course_id),
    user_username VARCHAR(255) NOT NULL,
    user_firstname VARCHAR(255),
    user_lastname VARCHAR(255),
    course_tag_count VARCHAR(255),
    course_tag VARCHAR(100) NOT NULL,
    course_title VARCHAR(100) NOT NULL,
    professor VARCHAR(100) NOT NULL,
    course_user_combo VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE assignments (
    assignment_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses (course_id),
    assignment_title VARCHAR(255),
    assignment_start_date DATE NOT NULL,
    assignment_due_date DATE NOT NULL,
    assignment_description TEXT NOT NULL,
    assignment_instruction TEXT NOT NULL,
    assignment_material_link VARCHAR(255),
    assignment_past BOOLEAN
);

CREATE TABLE announcements (
    announcement_id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses (course_id),
    announcement_title VARCHAR(255),
    announcement_post_date DATE NOT NULL,
    announcement_description TEXT NOT NULL,
    announcement_material_link VARCHAR(255),
    announcement_past BOOLEAN
);


CREATE TABLE conversations(
    conversation_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    conversation_starter VARCHAR(255) NOT NULL,
    conversation_receiver VARCHAR(255) NOT NULL,
    starter_new_message BOOLEAN,
    receiver_new_message BOOLEAN,
    conversation_key VARCHAR(255) UNIQUE NOT NULL,
    conversation_updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages(
    conversation_id uuid REFERENCES conversations,
    conversation_key VARCHAR(255) NOT NULL,
    message_id SERIAL NOT NULL,
    message_content TEXT,
    message_sent_by VARCHAR(255) NOT NULL,
    message_sent_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions(
    question_id SERIAL PRIMARY KEY,
    question_title VARCHAR(255) NOT NULL,
    question_content TEXT NOT NULL,
    question_created_by_name VARCHAR(255) NOT NULL,
    question_created_by_username VARCHAR (255) NOT NULL,
    question_created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    course_title VARCHAR(100) NOT NULL,
    course_id VARCHAR(100) NOT NULL,
    question_answered_by VARCHAR(255),
    question_status BOOLEAN
);

CREATE TABLE answers(
    answer_id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    answer_content text NOT NULL,
    answer_created_by_name VARCHAR(255) NOT NULL,
    answer_created_by_username VARCHAR(255) NOT NULL,
    answered_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    answer_is_final BOOLEAN
);