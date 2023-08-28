<template>
  <div class="profile">
    <div class="profile-header">
      <div class="text">
        <h2>Profile</h2>
        <h3>Lihat informasi seputar profilmu</h3>
      </div>
    </div>

    <div class="profile-border bg-white rounded-lg d-block d-sm-flex">
      <div class="profile-tab-nav border-right">
        <div class="image-box p-4">
          <div class="img-circle text-center mb-3">
            <img
              :src="`http://localhost:5173/src/assets/profile/${rightProfile.profile}`"
              alt="Image"
            />
          </div>
          <h4 class="profile-name text-center">{{ rightProfile.username }}</h4>
        </div>
        <div
          class="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <a
            class="nav-link"
            :class="{ active: akun }"
            id="account-tab"
            data-toggle="pill"
            @click="openAkun"
            role="tab"
            aria-controls="account"
            aria-selected="true"
          >
            <i class="fa fa-home text-center mr-1"></i>
            Akun
          </a>
          <!-- <a
            class="nav-link"
            :class="{ active: password }"
            id="password-tab"
            data-toggle="pill"
            @click="openPassword"
            role="tab"
            aria-controls="password"
            aria-selected="false"
          >
            <i class="fa fa-key text-center mr-1"></i>
            Password
          </a> -->
          <a
            class="nav-link"
            :class="{ active: foto }"
            id="security-tab"
            data-toggle="pill"
            @click="openFoto"
            role="tab"
            aria-controls="security"
            aria-selected="false"
          >
            <i class="fa fa-photo text-center mr-1"></i>
            Foto Profil
          </a>
        </div>
      </div>
      <div class="tab-content p-4 p-md-5">
        <div v-if="akun">
          <div
            class="tab-pane fade show active"
            id="account"
            role="tabpanel"
            aria-labelledby="account-tab"
          >
            <h3 class="profile-title mb-5">Pengaturan Akun</h3>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.username"
                    required
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.email"
                    readonly
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Phone number</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.phone"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Language</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.language"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <button class="btn-simpan" @click="editProfile">Simpan</button>
            </div>
          </div>
        </div>

        <!-- <div v-if="password">
          <div
            class="tab-pane fade show active"
            id="password"
            role="tabpanel"
            aria-labelledby="password-tab"
          >
            <h3 class="profile-title mb-5">Pengaturan Password</h3>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>Old password</label>
                  <input type="password" class="form-control" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>New password</label>
                  <input type="password" class="form-control" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Confirm new password</label>
                  <input type="password" class="form-control" />
                </div>
              </div>
            </div>
            <div>
              <button class="btn-simpan" @click="editPassword">Simpan</button>
            </div>
          </div>
        </div> -->
        <div v-if="foto">
          <div
            class="tab-pane fade show active"
            id="security"
            role="tabpanel"
            aria-labelledby="security-tab"
          >
            <h3 class="profile-title mb-5">Pengaturan Profil</h3>
            <div class="row">
              <div class="col-md-7">
                <div class="form-group">
                  <label>Profile preview</label>
                  <div class="col-md-6" style="padding: 0">
                    <img
                      v-if="imagePreview"
                      :src="imagePreview"
                      style="border-radius: 50%; width: 80px; height: 80px"
                    />
                    <img
                      v-else
                      :src="`http://localhost:5173/src/assets/profile/profile.png`"
                      style="border-radius: 50%; width: 80px; height: 80px"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label>Select a new profile picture</label>
                  <input
                    type="file"
                    class="file form-control"
                    accept="image/*"
                    @change="handleFileChange"
                  />
                </div>
              </div>
            </div>
            <div>
              <button class="btn-simpan" @click="editImage">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
@import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

.image-box {
  margin-bottom: 5px;
}

.picture.form-control {
  width: 100px;
  height: 100px;
  margin-bottom: 1.5rem;
}

.picture-preview {
  border-radius: 50%;
  width: 80px !important;
  height: 80px !important;
  margin-left: -1.5px;
  margin-top: 2.5px;
}

.row label {
  font-weight: 350;
  font-size: 15px;
}

.form-group input {
  font-weight: 350;
  font-size: 15px;
}

.nav-link.active {
  background-color: #2d3e50 !important;
  color: #ffffff !important;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.profile-title {
  font-size: 25px;
}

.profile-border {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  height: 400px;
  margin-bottom: 10px;
  max-width: 1000px;
  margin-left: 17.8%;
  border-radius: 8px;
}

.profile-header {
  background-color: #24262b;
  padding: 60px;
  margin-bottom: 70px;
  color: white;
}

.text {
  margin-left: 15%;
}

.profile-header h2 {
  margin: 0;
  font-size: 50px; /* Adjust the value as needed */
  font-weight: 700;
  margin-bottom: 15px;
}

.profile-header h3 {
  margin: 0;
  font-size: 16px; /* Adjust the value as needed */
  font-weight: 300;
}

.profile-tab-nav {
  min-width: 250px;
  height: 400px;
  background-color: #ffffff;
  color: #2d3e50;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.tab-content {
  flex: 1;
}

.form-group {
  margin-bottom: 1.5rem;
}
.nav-pills a.nav-link {
  padding: 15px 20px;
  border-radius: 0;
  color: #2d3e50;
  font-weight: 350;
}

.nav-pills a.nav-link i {
  width: 20px;
}

.img-circle img {
  height: 90px;
  width: 90px;
  border-radius: 100%;
}

.btn-simpan {
  background-color: #2d3e50;
  color: white;
  border-radius: 0.25rem;
  padding: 6px 12px;
}

.btn-simpan:hover {
  background-color: #232d37;
}

.swal2-shown {
  padding-right: 0 !important;
}

.swal2-popup {
  border-radius: 1rem !important;
}

.swal2-confirm:focus {
  box-shadow: none !important;
  outline: none !important;
}

.swal2-actions button {
  border-radius: 0.5rem !important;
}

.btn:focus {
  box-shadow: none !important;
  outline: none !important;
}
</style>

<script>
import { ref, reactive, onMounted } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
export default {
  setup() {
    const akun = ref(true);
    const password = ref(false);
    const foto = ref(false);
    const openAkun = () => {
      akun.value = true;
      password.value = false;
      foto.value = false;
    };
    const openPassword = () => {
      akun.value = false;
      password.value = true;
      foto.value = false;
    };
    const openFoto = () => {
      akun.value = false;
      password.value = false;
      foto.value = true;
    };

    const user = reactive({
      id: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      language: "",
      profile: "",
      changed_at: new Date().toLocaleDateString(),
    });

    const rightProfile = reactive({
      username: "",
      profile: "",
    });

    const image = reactive({
      blob: "",
      path: "../client/src/assets/profile",
      filename: "",
    });

    const imagePreview = ref(null);

    const router = useRouter();

    const timestamp = Date.now();

    const handleFileChange = (event) => {
      const file = event.target.files[0]; // Get the first selected file

      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.value = reader.result;
        image.blob = reader.result; // Store the file content as a data URL in data.content
        image.filename = `${timestamp}_${file.name}`;
        user.profile = `${timestamp}_${file.name}`;
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    };

    onMounted(async () => {
      try {
        await fetch("http://localhost:8080/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((res) => {
            Object.assign(user, {
              id: res.id,
              username: res.username,
              password: res.password,
              email: res.email,
              phone: res.phone,
              language: res.language,
              profile: res.profile,
            });
          });
      } catch (error) {
        console.log(error);
      }
    });

    onMounted(async () => {
      try {
        await fetch("http://localhost:8080/user", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
          .then((response) => response.json())
          .then((res) => {
            Object.assign(rightProfile, {
              username: res.username,
              profile: res.profile,
            });
          });
      } catch (error) {
        console.log(error);
      }
    });

    const editPassword = async () => {};

    const editProfile = async () => {
      if (user.username == "") {
        Swal.fire({
          title: "Gagal!",
          text: "Lengkapi field data!",
          icon: "error",
          confirmButtonColor: "#2d3e50",
        });
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/user/${user.id}?update=account`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          }
        );

        if (res.ok) {
          await Swal.fire({
            title: "Berhasil!",
            text: "Profile berhasil diedit",
            icon: "success",
            confirmButtonColor: "#2d3e50",
          });
          router.go(0);
        } else {
          throw new Error();
        }
      } catch (error) {
        Swal.fire({
          title: "Gagal!",
          text: "Tidak ada data yang diedit",
          icon: "error",
          confirmButtonColor: "#2d3e50",
        });
        console.error("Error fetching data:", error);
      }
    };

    const editImage = async () => {
      console.log(user.changed_at);
      if (image.blob == "") {
        Swal.fire({
          title: "Gagal!",
          text: "Gambar belum ditambahkan",
          icon: "error",
          confirmButtonColor: "#2d3e50",
        });
        console.log("Please fill in all fields.");
        return;
      }

      if (image.blob !== "") {
        try {
          const res = await fetch("http://localhost:8080/admin/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(image),
            credentials: "include",
          });
          if (!res.ok) {
            throw new Error();
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      try {
        const res = await fetch(
          `http://localhost:8080/user/${user.id}?update=profile`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          }
        );

        if (res.ok) {
          await Swal.fire({
            title: "Berhasil!",
            text: "Profile berhasil diedit",
            icon: "success",
            confirmButtonColor: "#2d3e50",
          });
          router.go(0);
        } else {
          throw new Error();
        }
      } catch (error) {
        Swal.fire({
          title: "Gagal!",
          text: "Tidak ada data yang diedit",
          icon: "error",
          confirmButtonColor: "#2d3e50",
        });
        console.error("Error fetching data:", error);
      }
    };

    return {
      akun,
      password,
      foto,
      openAkun,
      openPassword,
      openFoto,
      imagePreview,
      handleFileChange,
      user,
      image,
      editProfile,
      editImage,
      router,
      editPassword,
      rightProfile,
    };
  },
};
</script>
