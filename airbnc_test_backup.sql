--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: amenities; Type: TABLE; Schema: public; Owner: myhzy
--

CREATE TABLE public.amenities (
    amenity character varying NOT NULL
);


ALTER TABLE public.amenities OWNER TO myhzy;

--
-- Name: auth_users; Type: TABLE; Schema: public; Owner: myhzy
--

CREATE TABLE public.auth_users (
    auth_user_id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.auth_users OWNER TO myhzy;

--
-- Name: auth_users_auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: myhzy
--

CREATE SEQUENCE public.auth_users_auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_users_auth_user_id_seq OWNER TO myhzy;

--
-- Name: auth_users_auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myhzy
--

ALTER SEQUENCE public.auth_users_auth_user_id_seq OWNED BY public.auth_users.auth_user_id;


--
-- Name: bookings; Type: TABLE; Schema: public; Owner: myhzy
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    property_id integer NOT NULL,
    guest_id integer NOT NULL,
    check_in_date date NOT NULL,
    check_out_date date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.bookings OWNER TO myhzy;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: myhzy
--

CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bookings_booking_id_seq OWNER TO myhzy;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myhzy
--

ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;


--
-- Name: favourites; Type: TABLE; Schema: public; Owner: myhzy
--

CREATE TABLE public.favourites (
    favourite_id integer NOT NULL,
    guest_id integer NOT NULL,
    property_id integer NOT NULL
);


ALTER TABLE public.favourites OWNER TO myhzy;

--
-- Name: favourites_favourite_id_seq; Type: SEQUENCE; Schema: public; Owner: myhzy
--

CREATE SEQUENCE public.favourites_favourite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favourites_favourite_id_seq OWNER TO myhzy;

--
-- Name: favourites_favourite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myhzy
--

ALTER SEQUENCE public.favourites_favourite_id_seq OWNED BY public.favourites.favourite_id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: myhzy
--

CREATE TABLE public.images (
    image_id integer NOT NULL,
    property_id integer NOT NULL,
    image_url character varying NOT NULL,
    alt_text character varying NOT NULL
);


ALTER TABLE public.images OWNER TO myhzy;

--
-- Name: images_image_id_seq; Type: SEQUENCE; Schema: public; Owner: myhzy
--

CREATE SEQUENCE public.images_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_image_id_seq OWNER TO myhzy;

--
-- Name: images_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myhzy
--

ALTER SEQUENCE public.images_image_id_seq OWNED BY public.images.image_id;


--
-- Name: properties; Type: TABLE; Schema: public; Owner: myhzy
--

CREATE TABLE public.properties (
    property_id integer NOT NULL,
    host_id integer NOT NULL,
    name character varying NOT NULL,
    location character varying NOT NULL,
    property_type character varying NOT NULL,
    price_per_night numeric(10,2) NOT NULL,
    description text,
    latitude numeric(9,6),
    longitude numeric(9,6)
);


ALTER TABLE public.properties OWNER TO myhzy;

--
-- Name: properties_amenities; Type: TABLE; Schema: public; Owner: myhzy
--

CREATE TABLE public.properties_amenities (
    property_amenities integer NOT NULL,
    property_id integer NOT NULL,
    amenity_slug character varying NOT NULL
);


ALTER TABLE public.properties_amenities OWNER TO myhzy;

--
-- Name: properties_amenities_property_amenities_seq; Type: SEQUENCE; Schema: public; Owner: myhzy
--

CREATE SEQUENCE public.properties_amenities_property_amenities_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.properties_amenities_property_amenities_seq OWNER TO myhzy;

--
-- Name: properties_amenities_property_amenities_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myhzy
--

ALTER SEQUENCE public.properties_amenities_property_amenities_seq OWNED BY public.properties_amenities.property_amenities;


--
-- Name: properties_property_id_seq; Type: SEQUENCE; Schema: public; Owner: myhzy
--

CREATE SEQUENCE public.properties_property_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.properties_property_id_seq OWNER TO myhzy;

--
-- Name: properties_property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myhzy
--

ALTER SEQUENCE public.properties_property_id_seq OWNED BY public.properties.property_id;


--
-- Name: property_types; Type: TABLE; Schema: public; Owner: myhzy
--

CREATE TABLE public.property_types (
    property_type character varying NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.property_types OWNER TO myhzy;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: myhzy
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    property_id integer NOT NULL,
    guest_id integer NOT NULL,
    rating integer,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.reviews OWNER TO myhzy;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: myhzy
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_review_id_seq OWNER TO myhzy;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myhzy
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: myhzy
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(20),
    is_host boolean NOT NULL,
    avatar character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO myhzy;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: myhzy
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO myhzy;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myhzy
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: auth_users auth_user_id; Type: DEFAULT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.auth_users ALTER COLUMN auth_user_id SET DEFAULT nextval('public.auth_users_auth_user_id_seq'::regclass);


--
-- Name: bookings booking_id; Type: DEFAULT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);


--
-- Name: favourites favourite_id; Type: DEFAULT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.favourites ALTER COLUMN favourite_id SET DEFAULT nextval('public.favourites_favourite_id_seq'::regclass);


--
-- Name: images image_id; Type: DEFAULT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.images ALTER COLUMN image_id SET DEFAULT nextval('public.images_image_id_seq'::regclass);


--
-- Name: properties property_id; Type: DEFAULT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.properties ALTER COLUMN property_id SET DEFAULT nextval('public.properties_property_id_seq'::regclass);


--
-- Name: properties_amenities property_amenities; Type: DEFAULT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.properties_amenities ALTER COLUMN property_amenities SET DEFAULT nextval('public.properties_amenities_property_amenities_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: amenities; Type: TABLE DATA; Schema: public; Owner: myhzy
--

COPY public.amenities (amenity) FROM stdin;
WiFi
TV
Kitchen
Parking
Washer
\.


--
-- Data for Name: auth_users; Type: TABLE DATA; Schema: public; Owner: myhzy
--

COPY public.auth_users (auth_user_id, email, password_hash, created_at) FROM stdin;
1	testuser@example.com	$2b$10$9zLYgAzlwCyq031nfjtzYueMl0CFU6NXjTRmOG2fsM0H6MhO6xymu	2025-07-29 11:28:53.750836
2	sampleuser@example.com	$2b$10$LJ.VO2J92.mXiLD85WAJ../qKNDxCrGkcISpo7eLSzTrke/janlIG	2025-07-29 11:28:53.750836
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: myhzy
--

COPY public.bookings (booking_id, property_id, guest_id, check_in_date, check_out_date, created_at) FROM stdin;
1	1	2	2025-12-01	2025-12-05	2025-07-29 11:28:53.796891
2	2	6	2025-12-10	2025-12-15	2025-07-29 11:28:53.796891
3	3	4	2025-12-12	2025-12-14	2025-07-29 11:28:53.796891
4	4	6	2025-12-20	2025-12-23	2025-07-29 11:28:53.796891
5	5	6	2025-12-05	2025-12-08	2025-07-29 11:28:53.796891
6	6	2	2025-12-08	2025-12-12	2025-07-29 11:28:53.796891
7	7	4	2025-12-18	2025-12-22	2025-07-29 11:28:53.796891
8	8	6	2025-12-25	2025-12-28	2025-07-29 11:28:53.796891
9	9	6	2025-12-16	2025-12-19	2025-07-29 11:28:53.796891
10	10	6	2025-12-22	2025-12-26	2025-07-29 11:28:53.796891
\.


--
-- Data for Name: favourites; Type: TABLE DATA; Schema: public; Owner: myhzy
--

COPY public.favourites (favourite_id, guest_id, property_id) FROM stdin;
1	2	1
2	6	2
3	4	3
4	6	4
5	6	5
6	2	6
7	4	8
8	4	7
9	2	9
10	2	10
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: myhzy
--

COPY public.images (image_id, property_id, image_url, alt_text) FROM stdin;
1	1	https://example.com/images/modern_apartment_1.jpg	Alt tag for Modern Apartment in City Center
2	1	https://example.com/images/modern_apartment_3.jpg	Alt tag for Modern Apartment in City Center 2
3	1	https://example.com/images/modern_apartment_3.jpg	Alt tag for Modern Apartment in City Center 3
4	2	https://example.com/images/cosy_family_house_1.jpg	Alt tag for Cosy Family House
5	3	https://example.com/images/chic_studio_1.jpg	Alt tag for Chic Studio Near the Beach
6	4	https://example.com/images/elegant_city_apartment_1.jpg	Alt tag for Elegant City Apartment
7	5	https://example.com/images/charming_studio_1.jpg	Alt tag for Charming Studio Retreat
8	6	https://example.com/images/luxury_penthouse_1.jpg	Alt tag for Luxury Penthouse with View
9	7	https://example.com/images/spacious_house_1.jpg	Alt tag for Spacious Countryside House
10	8	https://example.com/images/seaside_studio_1.jpg	Alt tag for Seaside Studio Getaway
11	9	https://example.com/images/cosy_loft_1.jpg	Alt tag for Cosy Loft in the Heart of the City
12	10	https://example.com/images/quaint_cottage_1.jpg	Alt tag for Quaint Cottage in the Hills
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: myhzy
--

COPY public.properties (property_id, host_id, name, location, property_type, price_per_night, description, latitude, longitude) FROM stdin;
1	1	Modern Apartment in City Center	London, UK	Apartment	120.00	Description of Modern Apartment in City Center.	51.509865	-0.118092
2	1	Cosy Family House	Manchester, UK	House	150.00	Description of Cosy Family House.	53.480950	-2.237430
3	1	Chic Studio Near the Beach	Brighton, UK	Studio	90.00	Description of Chic Studio Near the Beach.	50.827778	-0.152778
4	3	Elegant City Apartment	Birmingham, UK	Apartment	110.00	Description of Elegant City Apartment.	52.489471	-1.898575
5	3	Charming Studio Retreat	Bristol, UK	Studio	85.00	Description of Charming Studio Retreat.	51.454514	-2.587910
6	1	Luxury Penthouse with View	London, UK	Apartment	250.00	Description of Luxury Penthouse with View.	51.509865	-0.118092
7	5	Spacious Countryside House	Yorkshire, UK	House	200.00	Description of Spacious Countryside House.	53.958332	-1.080278
8	3	Seaside Studio Getaway	Cornwall, UK	Studio	95.00	Description of Seaside Studio Getaway.	50.266043	-5.052710
9	5	Cosy Loft in the Heart of the City	Manchester, UK	Apartment	130.00	Description of Cosy Loft in the Heart of the City.	53.480950	-2.237430
10	5	Quaint Cottage in the Hills	Lake District, UK	House	180.00	Description of Quaint Cottage in the Hills.	54.460900	-3.088600
11	1	Bright and Airy Studio	Cambridge, UK	Studio	100.00	Description of Bright and Airy Studio.	52.205338	0.121817
\.


--
-- Data for Name: properties_amenities; Type: TABLE DATA; Schema: public; Owner: myhzy
--

COPY public.properties_amenities (property_amenities, property_id, amenity_slug) FROM stdin;
1	1	WiFi
2	1	TV
3	1	Kitchen
4	2	WiFi
5	2	Parking
6	2	Kitchen
7	3	WiFi
8	4	TV
9	4	Kitchen
10	4	Washer
11	5	WiFi
12	5	TV
13	6	WiFi
14	6	Parking
15	6	TV
16	7	Washer
17	7	Parking
18	7	Kitchen
19	8	WiFi
20	9	WiFi
21	9	Kitchen
22	9	TV
23	10	Washer
24	10	Parking
25	10	WiFi
26	11	WiFi
27	11	TV
\.


--
-- Data for Name: property_types; Type: TABLE DATA; Schema: public; Owner: myhzy
--

COPY public.property_types (property_type, description) FROM stdin;
Apartment	Description of Apartment.
House	Description of House.
Studio	Description of Studio.
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: myhzy
--

COPY public.reviews (review_id, property_id, guest_id, rating, comment, created_at) FROM stdin;
1	3	4	4	Comment about Chic Studio Near the Beach: Great location and cosy space, perfect for a beach getaway.	2025-07-29 11:28:53.77275
2	1	2	2	Comment about Modern Apartment in City Center: Too noisy at night, and the apartment felt cramped. Wouldn’t stay again.	2025-07-29 11:28:53.77275
3	6	6	5	Comment about Luxury Penthouse with View: Incredible property! The view from the penthouse is stunning.	2025-07-29 11:28:53.77275
4	4	4	2	Comment about Elegant City Apartment: The apartment was nice but not as advertised. The bed was uncomfortable.	2025-07-29 11:28:53.77275
5	9	6	3	Comment about Cosy Loft in the Heart of the City: Great location but the loft was a bit smaller than expected.	2025-07-29 11:28:53.77275
6	5	2	4	Comment about Charming Studio Retreat: Loved the ambiance and decor, but had some issues with the Wi-Fi connection.	2025-07-29 11:28:53.77275
7	7	4	5	Comment about Spacious Countryside House: Beautiful home, very spacious and perfect for a family retreat.	2025-07-29 11:28:53.77275
8	1	6	3	Comment about Modern Apartment in City Center: Central location but parking was a hassle and the space felt a bit cramped.	2025-07-29 11:28:53.77275
9	3	4	3	Comment about Chic Studio Near the Beach: Stylish but the bathroom could use some updates.	2025-07-29 11:28:53.77275
10	9	2	5	Comment about Cosy Loft in the Heart of the City: Amazing loft with great city views, very comfortable.	2025-07-29 11:28:53.77275
11	6	6	1	Comment about Luxury Penthouse with View: Disappointing experience. The penthouse was overpriced, and the service was poor.	2025-07-29 11:28:53.77275
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: myhzy
--

COPY public.users (user_id, first_name, surname, email, phone_number, is_host, avatar, created_at) FROM stdin;
1	Alice	Johnson	alice@example.com	+44 7000 111111	t	https://example.com/images/alice.jpg	2025-07-29 11:28:53.757909
2	Bob	Smith	bob@example.com	+44 7000 222222	f	https://example.com/images/bob.jpg	2025-07-29 11:28:53.757909
3	Emma	Davis	emma@example.com	+44 7000 333333	t	https://example.com/images/emma.jpg	2025-07-29 11:28:53.757909
4	Frank	White	frank@example.com	+44 7000 444444	f	https://example.com/images/frank.jpg	2025-07-29 11:28:53.757909
5	Isabella	Martinez	isabella@example.com	+44 7000 555555	t	https://example.com/images/isabella.jpg	2025-07-29 11:28:53.757909
6	Rachel	Cummings	rachel@example.com	+44 7000 666666	f	https://example.com/images/rachel.jpg	2025-07-29 11:28:53.757909
\.


--
-- Name: auth_users_auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myhzy
--

SELECT pg_catalog.setval('public.auth_users_auth_user_id_seq', 2, true);


--
-- Name: bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myhzy
--

SELECT pg_catalog.setval('public.bookings_booking_id_seq', 10, true);


--
-- Name: favourites_favourite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myhzy
--

SELECT pg_catalog.setval('public.favourites_favourite_id_seq', 10, true);


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myhzy
--

SELECT pg_catalog.setval('public.images_image_id_seq', 12, true);


--
-- Name: properties_amenities_property_amenities_seq; Type: SEQUENCE SET; Schema: public; Owner: myhzy
--

SELECT pg_catalog.setval('public.properties_amenities_property_amenities_seq', 27, true);


--
-- Name: properties_property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myhzy
--

SELECT pg_catalog.setval('public.properties_property_id_seq', 11, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myhzy
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 11, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myhzy
--

SELECT pg_catalog.setval('public.users_user_id_seq', 6, true);


--
-- Name: amenities amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.amenities
    ADD CONSTRAINT amenities_pkey PRIMARY KEY (amenity);


--
-- Name: auth_users auth_users_email_key; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.auth_users
    ADD CONSTRAINT auth_users_email_key UNIQUE (email);


--
-- Name: auth_users auth_users_pkey; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.auth_users
    ADD CONSTRAINT auth_users_pkey PRIMARY KEY (auth_user_id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);


--
-- Name: favourites favourites_pkey; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_pkey PRIMARY KEY (favourite_id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- Name: properties_amenities properties_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.properties_amenities
    ADD CONSTRAINT properties_amenities_pkey PRIMARY KEY (property_amenities);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (property_id);


--
-- Name: property_types property_types_pkey; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.property_types
    ADD CONSTRAINT property_types_pkey PRIMARY KEY (property_type);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: bookings bookings_guest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_guest_id_fkey FOREIGN KEY (guest_id) REFERENCES public.users(user_id);


--
-- Name: bookings bookings_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(property_id);


--
-- Name: favourites favourites_guest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_guest_id_fkey FOREIGN KEY (guest_id) REFERENCES public.users(user_id);


--
-- Name: favourites favourites_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(property_id);


--
-- Name: properties_amenities properties_amenities_amenity_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.properties_amenities
    ADD CONSTRAINT properties_amenities_amenity_slug_fkey FOREIGN KEY (amenity_slug) REFERENCES public.amenities(amenity);


--
-- Name: properties_amenities properties_amenities_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.properties_amenities
    ADD CONSTRAINT properties_amenities_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(property_id);


--
-- Name: properties properties_host_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_host_id_fkey FOREIGN KEY (host_id) REFERENCES public.users(user_id);


--
-- Name: properties properties_property_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_property_type_fkey FOREIGN KEY (property_type) REFERENCES public.property_types(property_type);


--
-- Name: reviews reviews_guest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_guest_id_fkey FOREIGN KEY (guest_id) REFERENCES public.users(user_id);


--
-- Name: reviews reviews_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myhzy
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(property_id);


--
-- PostgreSQL database dump complete
--

