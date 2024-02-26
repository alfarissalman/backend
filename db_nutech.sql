PGDMP         6                |         	   db_nutech    15.4    15.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    40978 	   db_nutech    DATABASE     �   CREATE DATABASE db_nutech WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE db_nutech;
                postgres    false            �            1259    41002    tb_balances    TABLE     �   CREATE TABLE public.tb_balances (
    id character varying,
    balance character varying,
    user_email character varying NOT NULL
);
    DROP TABLE public.tb_balances;
       public         heap    postgres    false            �            1259    40988 	   tb_banner    TABLE     �   CREATE TABLE public.tb_banner (
    id_banner character varying NOT NULL,
    banner_name character varying,
    banner_image character varying,
    description character varying
);
    DROP TABLE public.tb_banner;
       public         heap    postgres    false            �            1259    40995 
   tb_service    TABLE     �   CREATE TABLE public.tb_service (
    id_service character varying NOT NULL,
    service_code character varying,
    service_name character varying,
    service_icon character varying,
    service_tariff character varying
);
    DROP TABLE public.tb_service;
       public         heap    postgres    false            �            1259    41014    tb_transaction    TABLE     T  CREATE TABLE public.tb_transaction (
    id_transaction character varying NOT NULL,
    invoice_number character varying,
    service_code character varying,
    service_name character varying,
    transaction_type character varying,
    total_amount character varying,
    created_on character varying,
    user_email character varying
);
 "   DROP TABLE public.tb_transaction;
       public         heap    postgres    false            �            1259    40979    tb_users    TABLE       CREATE TABLE public.tb_users (
    id character varying NOT NULL,
    email character varying,
    first_name character varying,
    last_name character varying,
    password character varying,
    role character varying,
    profile_image character varying
);
    DROP TABLE public.tb_users;
       public         heap    postgres    false                      0    41002    tb_balances 
   TABLE DATA           >   COPY public.tb_balances (id, balance, user_email) FROM stdin;
    public          postgres    false    217   �                 0    40988 	   tb_banner 
   TABLE DATA           V   COPY public.tb_banner (id_banner, banner_name, banner_image, description) FROM stdin;
    public          postgres    false    215   �                 0    40995 
   tb_service 
   TABLE DATA           j   COPY public.tb_service (id_service, service_code, service_name, service_icon, service_tariff) FROM stdin;
    public          postgres    false    216   �                 0    41014    tb_transaction 
   TABLE DATA           �   COPY public.tb_transaction (id_transaction, invoice_number, service_code, service_name, transaction_type, total_amount, created_on, user_email) FROM stdin;
    public          postgres    false    218   �                 0    40979    tb_users 
   TABLE DATA           c   COPY public.tb_users (id, email, first_name, last_name, password, role, profile_image) FROM stdin;
    public          postgres    false    214   {       u           2606    40987    tb_users email 
   CONSTRAINT     J   ALTER TABLE ONLY public.tb_users
    ADD CONSTRAINT email UNIQUE (email);
 8   ALTER TABLE ONLY public.tb_users DROP CONSTRAINT email;
       public            postgres    false    214            }           2606    41008    tb_balances tb_balances_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.tb_balances
    ADD CONSTRAINT tb_balances_pkey PRIMARY KEY (user_email);
 F   ALTER TABLE ONLY public.tb_balances DROP CONSTRAINT tb_balances_pkey;
       public            postgres    false    217            y           2606    40994    tb_banner tb_banner_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.tb_banner
    ADD CONSTRAINT tb_banner_pkey PRIMARY KEY (id_banner);
 B   ALTER TABLE ONLY public.tb_banner DROP CONSTRAINT tb_banner_pkey;
       public            postgres    false    215            {           2606    41001    tb_service tb_service_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.tb_service
    ADD CONSTRAINT tb_service_pkey PRIMARY KEY (id_service);
 D   ALTER TABLE ONLY public.tb_service DROP CONSTRAINT tb_service_pkey;
       public            postgres    false    216                       2606    41020 "   tb_transaction tb_transaction_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.tb_transaction
    ADD CONSTRAINT tb_transaction_pkey PRIMARY KEY (id_transaction);
 L   ALTER TABLE ONLY public.tb_transaction DROP CONSTRAINT tb_transaction_pkey;
       public            postgres    false    218            w           2606    40985    tb_users tb_users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.tb_users
    ADD CONSTRAINT tb_users_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.tb_users DROP CONSTRAINT tb_users_pkey;
       public            postgres    false    214            �           2606    41009    tb_balances tb_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.tb_balances
    ADD CONSTRAINT tb_users FOREIGN KEY (user_email) REFERENCES public.tb_users(email) NOT VALID;
 >   ALTER TABLE ONLY public.tb_balances DROP CONSTRAINT tb_users;
       public          postgres    false    217    3189    214               8   x�3�42 ����"C��Ғ���̼������L���\.CNSK3�*�jb���� ��'         x   x��̻1 �:����%�9�h"��p�J������� ou�T
VX�!��c邯㒋�^S�!1�w'����	6n��~~�
-$B�f�A6k6d�f�A6j6d�f�A���?>���           x����r�0����@AP�u��-�FNg��f ʄ�зo��g��$��/�Yǅ	I;�PB!e�=�v�$?we#y.�+-l[�����:�9�g�e8�ӍGbX+��ظ��A������=�5��ɾա�¤��f<������X�5�(=#���W$!&0��4�(q,��H2�M��36y>��A��n�B��+��%� ����4�`�܍��E�[�_�*`P\`QQ�IQV�j8z��$ԓ<ae2ϛ��e�/2��         �  x���[o\Eǟw?EޑW��s�>�A} JX��R_<���j��w˥j@-�<�3#����)���aMC��j)��Jc�O�|}�#4�BK-�&`�F��2���������~�_/������gW��x6	� &H�:�>�>ˎ�}�u���-�w���n��͟����n��mkeՅڠ�����vbB\T˙�:�:[,�A�8X��CY�2�o��p�^�ۿ��>�]k��?�i����-��$y '�T|�����ݖbL��x�VwH>u�bD�7��/n���燫��m�_���ysqi��n����qC��4�=�=�.���˫�67����dx�iJ����&��V��ҭ�F$�:�U�V���OA�}�2}�6Ь ��#&�L`�C������h��I8?VW5�R@�,g��=-��b���;���n�6瑒��q�t�A�8ƹj_t&�Hg�V ���T�D�#"Qr�Z>��#>N{)���_k6K�3z�C�&���9f�A�#���c�>s�( �,9�Iy
��xϺ��[���l�#اBh�S���4zI�s�g�J�S�"�f�6j��� �lK)��K I�OV7��;�cl@0hV�ֵcj�����%���ZH(6����A�B�S��K(����GSu�1�Nck��Aˍ�C͞���R!�4F�X�ހ�.B����|�ėK}��r��n��         A  x���Ko�@�5��.���0��T����ڇV�^A^��oc�e��͹9918A�ɀF(��0i 055�tJ���au��M$ ͛0��:�Qz�J�&<mB.9���K��Qʕ������)�z��p�de�:h�b��jPn��+�X�����]l��Q��.��`��sogoԹ�������e��4��ZU�"𲤨�k
!T52��d���tp8�2�á �{! �� C#�s�1��b����Gde����Ʒ��[9����a[N��#v�1�+�j���j�jO���^3���'�o�ޑ�Y�?�ԃ(     