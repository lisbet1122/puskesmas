<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header('Content-Type: application/json; charset=UTF-8');

include "db_config.php"; // koneksi ke database

$postjson = json_decode(file_get_contents('php://input'), true);
$aksi = isset($postjson['aksi']) ? strip_tags($postjson['aksi']) : null;

$data = array();

if (!$aksi) {
    echo json_encode(['success' => false, 'msg' => 'Aksi tidak dikirim']);
    exit;
}

switch ($aksi) {

    case "add_register":
        $nama = filter_var($postjson['nama'], FILTER_SANITIZE_STRING);
        $nohp = filter_var($postjson['nohp'], FILTER_SANITIZE_STRING);
        $email = filter_var($postjson['email'], FILTER_SANITIZE_STRING);
        $tanggal = filter_var($postjson['tanggal'], FILTER_SANITIZE_STRING);
        $status = filter_var($postjson['status'], FILTER_SANITIZE_STRING);
        $poli = filter_var($postjson['poli'], FILTER_SANITIZE_STRING);
        $keterangan = filter_var($postjson['keterangan'], FILTER_SANITIZE_STRING);

        try {
            $sql = "INSERT INTO pendaftaran (nama, nohp, email, tanggal, status, poli, keterangan)
                    VALUES (:nama, :nohp, :email, :tanggal, :status, :poli, :keterangan)";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':nama', $nama);
            $stmt->bindParam(':nohp', $nohp);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':tanggal', $tanggal);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':poli', $poli);
            $stmt->bindParam(':keterangan', $keterangan);
            $stmt->execute();

            echo json_encode(['success' => true, 'msg' => 'Pendaftaran berhasil disimpan']);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'msg' => $e->getMessage()]);
        }
        break;

    case "getdata":
        try {
            $stmt = $pdo->prepare("SELECT * FROM pendaftaran ORDER BY id DESC");
            $stmt->execute();
            $data = [];

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $data[] = $row;
            }

            echo json_encode(['success' => true, 'result' => $data]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'msg' => 'Gagal mengambil data: ' . $e->getMessage()]);
        }
        break;

    case "login_admin":
        $username = filter_var($postjson['username'], FILTER_SANITIZE_STRING);
        $password = filter_var($postjson['password'], FILTER_SANITIZE_STRING);

        try {
            $sql = "SELECT * FROM admin WHERE username = :username AND password = :password";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':password', $password);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode(['success' => true, 'message' => 'Login berhasil']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Username atau password salah']);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'msg' => $e->getMessage()]);
        }
        break;

    default:
        echo json_encode(['success' => false, 'msg' => 'Aksi tidak dikenali']);
        break;
}
