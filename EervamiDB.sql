--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2021-12-28 21:45:45

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
-- TOC entry 3011 (class 1262 OID 107002)
-- Name: Eervami; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Eervami" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';


ALTER DATABASE "Eervami" OWNER TO postgres;

\connect "Eervami"

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
-- TOC entry 3012 (class 0 OID 0)
-- Dependencies: 3011
-- Name: DATABASE "Eervami"; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE "Eervami" IS 'Database used in the eervami chat app.';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 107008)
-- Name: Messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Messages" (
    user1 character varying(30) NOT NULL,
    user2 character varying(30) NOT NULL,
    "msgId" bigint NOT NULL,
    msg character varying,
    date_time date
);


ALTER TABLE public."Messages" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 107016)
-- Name: Messages_msgId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Messages" ALTER COLUMN "msgId" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Messages_msgId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 200 (class 1259 OID 107003)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    username character varying(30) NOT NULL,
    password character varying(30) NOT NULL,
    email character varying(60) NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 107030)
-- Name: friends; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friends (
    user1 character varying NOT NULL,
    user2 character varying NOT NULL
);


ALTER TABLE public.friends OWNER TO postgres;

--
-- TOC entry 3003 (class 0 OID 107008)
-- Dependencies: 201
-- Data for Name: Messages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3002 (class 0 OID 107003)
-- Dependencies: 200
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Users" (username, password, email) VALUES ('Alphonse', '123', 'alpha@test.com');
INSERT INTO public."Users" (username, password, email) VALUES ('Cornelius', '123', 'charlie@test.com');
INSERT INTO public."Users" (username, password, email) VALUES ('Barbara', '123', 'beta@test.com');


--
-- TOC entry 3005 (class 0 OID 107030)
-- Dependencies: 203
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.friends (user1, user2) VALUES ('Alphonse', 'Barbara');
INSERT INTO public.friends (user1, user2) VALUES ('Alphonse', 'Cornelius');


--
-- TOC entry 3013 (class 0 OID 0)
-- Dependencies: 202
-- Name: Messages_msgId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Messages_msgId_seq"', 1, false);


--
-- TOC entry 2867 (class 2606 OID 107037)
-- Name: friends Friends_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT "Friends_pkey" PRIMARY KEY (user1, user2);


--
-- TOC entry 2863 (class 2606 OID 107015)
-- Name: Messages Messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (user2, "msgId");


--
-- TOC entry 2865 (class 2606 OID 107019)
-- Name: Messages Messages_user1_user2_msgId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_user1_user2_msgId_key" UNIQUE (user1, user2, "msgId");


--
-- TOC entry 2861 (class 2606 OID 107007)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (username);


--
-- TOC entry 2870 (class 2606 OID 107038)
-- Name: friends ForeignKey1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT "ForeignKey1" FOREIGN KEY (user1) REFERENCES public."Users"(username) NOT VALID;


--
-- TOC entry 2871 (class 2606 OID 107043)
-- Name: friends ForeignKey2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT "ForeignKey2" FOREIGN KEY (user2) REFERENCES public."Users"(username) NOT VALID;


--
-- TOC entry 2868 (class 2606 OID 107020)
-- Name: Messages Users_relation1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Users_relation1" FOREIGN KEY (user1) REFERENCES public."Users"(username) NOT VALID;


--
-- TOC entry 2869 (class 2606 OID 107025)
-- Name: Messages Users_relation2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Users_relation2" FOREIGN KEY (user1) REFERENCES public."Users"(username) NOT VALID;


-- Completed on 2021-12-28 21:45:45

--
-- PostgreSQL database dump complete
--

