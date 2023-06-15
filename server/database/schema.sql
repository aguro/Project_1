--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-04 23:08:09 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 219 (class 1255 OID 16504)
-- Name: check_duplicate_rating(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_duplicate_rating() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM ratings
    WHERE movie_id = NEW.movie_id AND user_id = NEW.user_id
  ) THEN
    RAISE EXCEPTION 'User has already rated this movie.';
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_duplicate_rating() OWNER TO postgres;

--
-- TOC entry 218 (class 1255 OID 16457)
-- Name: check_email(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.check_email() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   IF EXISTS (
       SELECT 1
       FROM public.users
       WHERE email = NEW.email
   ) THEN
       RAISE EXCEPTION 'Cannot add a duplicate record.';
   END IF;
   RETURN NEW;
END;
$$;


ALTER FUNCTION public.check_email() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16487)
-- Name: ratings; Type: TABLE; Schema: public; Owner: KinoBambino_admin
--

CREATE TABLE public.ratings (
    rating_id integer NOT NULL,
    rating integer NOT NULL,
    movie_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.ratings OWNER TO "KinoBambino_admin";

--
-- TOC entry 216 (class 1259 OID 16486)
-- Name: ratings_rating_id_seq; Type: SEQUENCE; Schema: public; Owner: KinoBambino_admin
--

CREATE SEQUENCE public.ratings_rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ratings_rating_id_seq OWNER TO "KinoBambino_admin";

--
-- TOC entry 3607 (class 0 OID 0)
-- Dependencies: 216
-- Name: ratings_rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: KinoBambino_admin
--

ALTER SEQUENCE public.ratings_rating_id_seq OWNED BY public.ratings.rating_id;


--
-- TOC entry 215 (class 1259 OID 16451)
-- Name: users; Type: TABLE; Schema: public; Owner: KinoBambino_admin
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(100) NOT NULL,
    firstname character varying(100),
    lastname character varying(100),
    password character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO "KinoBambino_admin";

--
-- TOC entry 214 (class 1259 OID 16450)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: KinoBambino_admin
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO "KinoBambino_admin";

--
-- TOC entry 3608 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: KinoBambino_admin
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3447 (class 2604 OID 16490)
-- Name: ratings rating_id; Type: DEFAULT; Schema: public; Owner: KinoBambino_admin
--

ALTER TABLE ONLY public.ratings ALTER COLUMN rating_id SET DEFAULT nextval('public.ratings_rating_id_seq'::regclass);


--
-- TOC entry 3446 (class 2604 OID 16454)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: KinoBambino_admin
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3601 (class 0 OID 16487)
-- Dependencies: 217
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: KinoBambino_admin
--

COPY public.ratings (rating_id, rating, movie_id, user_id) FROM stdin;
1	4	9259	1
2	2	46189	1
3	4	28526	1
4	2	28526	2
5	1	46189	2
7	5	9259	2
8	5	28526	3
11	2	46189	3
21	4	9259	3
23	5	9259	6
27	1	46189	6
29	5	28526	6
30	5	9259	7
34	1	46189	7
38	5	28526	7
42	5	2349	1
45	5	2349	6
49	4	51381	6
51	5	51382	1
54	2	51381	2
61	4	51381	8
62	5	9259	8
64	1	46189	8
65	5	28526	8
66	5	2349	8
67	5	50999	8
68	5	45006	8
\.


--
-- TOC entry 3599 (class 0 OID 16451)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: KinoBambino_admin
--

COPY public.users (user_id, email, firstname, lastname, password) FROM stdin;
1	test1@test	Adam	Testowy	1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014
2	test2@test	Anna	Testowa	60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752
3	test3@test	Julia	Test	fd61a03af4f77d870fc21e05e7e80678095c92d808cfb3b5c279ee04c74aca13
6	test4@test	Jerzy	Teścik	a4e624d686e03ed2767c0abd85c14426b0b1157d2ce81d27bb4fe4f6f01d688a
7	test5@test	Maria	Teścik	a140c0c1eda2def2b830363ba362aa4d7d255c262960544821f556e16661b6ff
8	test6@test	Karolina	Testolina	ed0cb90bdfa4f93981a7d03cff99213a86aa96a6cbcf89ec5e8889871f088727
\.


--
-- TOC entry 3609 (class 0 OID 0)
-- Dependencies: 216
-- Name: ratings_rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: KinoBambino_admin
--

SELECT pg_catalog.setval('public.ratings_rating_id_seq', 68, true);


--
-- TOC entry 3610 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: KinoBambino_admin
--

SELECT pg_catalog.setval('public.users_user_id_seq', 8, true);


--
-- TOC entry 3451 (class 2606 OID 16492)
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: KinoBambino_admin
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (rating_id);


--
-- TOC entry 3449 (class 2606 OID 16456)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: KinoBambino_admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3455 (class 2620 OID 16505)
-- Name: ratings prevent_duplicate_ratings; Type: TRIGGER; Schema: public; Owner: KinoBambino_admin
--

CREATE TRIGGER prevent_duplicate_ratings BEFORE INSERT ON public.ratings FOR EACH ROW EXECUTE FUNCTION public.check_duplicate_rating();


--
-- TOC entry 3454 (class 2620 OID 16458)
-- Name: users unique_email; Type: TRIGGER; Schema: public; Owner: KinoBambino_admin
--

CREATE TRIGGER unique_email BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.check_email();


--
-- TOC entry 3452 (class 2606 OID 16493)
-- Name: ratings ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: KinoBambino_admin
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- TOC entry 3453 (class 2606 OID 16498)
-- Name: ratings ratings_user_id_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: KinoBambino_admin
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey1 FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2023-05-04 23:08:09 CEST

--
-- PostgreSQL database dump complete
--

