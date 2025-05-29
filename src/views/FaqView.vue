<template>
  <div class="faq">
    <div class="faq-header">
      <div class="text">
        <h2>FAQ</h2>
        <h3>Lihat Pertanyaan Yang Sering Ditanyakan</h3>
      </div>
    </div>
    <div class="faq-page">
      <div class="faq-sidebar">
        <h2>Bantuan Banjir</h2>
        <div v-for="category in faqCategories" :key="category.id">
          <div
            class="faq-category"
            :class="{ active: category.id === activeCategory }"
            @click="toggleCategory(category.id)"
          >
            <span class="category-title">
              <img
                src="/assets/line.png"
                class="line"
                v-if="category.id === activeCategory"
              />
              {{ category.title }}
            </span>
          </div>
        </div>
      </div>
      <div class="faq-content">
        <div class="faq-questions">
          <div
            v-for="question in filteredQuestions"
            :key="question.id"
            class="wrapper-faq"
          >
            <div class="faq-question">
              {{ question.question }}
              <button class="button">Lihat</button>
            </div>
            <div class="faq-answer">
              {{ question.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.line {
  margin-left: -30px;
  height: 22px;
  margin-top: 1px;
  position: absolute;
}

.faq-search-box {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 70%;
  height: 120px;
  background-color: white;
  transform: translate(-50%);
  border-radius: 10px;
  margin-bottom: -60px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.faq-header {
  background-color: #24262b;
  padding: 60px;
  margin-bottom: 30px;
  color: white;
}

.text {
  margin-left: 15%;
}

.faq-header h2 {
  margin: 0;
  font-size: 50px; /* Adjust the value as needed */
  font-weight: 700;
  margin-bottom: 15px;
}

.faq-header h3 {
  margin: 0;
  font-size: 16px; /* Adjust the value as needed */
  font-weight: 300;
}

.faq-sidebar h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 25px;
}

.faq-page {
  display: flex;
  margin-left: 16.3%;
}

.faq-sidebar {
  flex: 0 0 360px;
  padding: 20px;
}

.faq-category {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.faq-category.active {
  font-weight: 500;
}

.category-title {
  margin-left: 30px;
}

.faq-content {
  flex: 1;
  padding: 20px;
  max-width: 700px;
}

.faq-no-results {
  font-style: italic;
}

.faq-question {
  display: flex;
  pointer-events: none;
  font-weight: 500;
  font-size: 16px;
  align-items: center;
}

.wrapper-faq {
  background-color: #ffffff;
  margin-bottom: 20px;
  padding: 18px 30px;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

.faq-questions {
  margin-top: 47px;
}

.faq-question button {
  padding: 5px 25px;
  background-color: #2d3e50;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 30px;
  font-size: 14px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: fill;
}

.faq-question button:hover {
  background-color: #1e2a36 !important;
  transition: 0.3s ease;
}

.faq-answer {
  background-color: transparent;
  border-radius: 4px;
  font-size: 14px;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
}
</style>
<script>
export default {
  name: "FAQPage",
  data() {
    return {
      faqCategories: [
        {
          id: 1,
          title: "Informasi Banjir",
          questions: [
            {
              id: 1,
              question: "Apa yang menyebabkan Pekanbaru banjir?",
              answer:
                "Secara geografis, Pekanbaru berada diantara daerah rawa-rawa dan pinggiran sungai. Hal ini membuat banjir di Jakarta disebabkan oleh 3 jenis banjir yang berbeda, yaitu banjir kiriman, banjir hujan lokal, dan banjir rob. Selain itu, pembuangan limbah ke sungai atau kanal dapat menyebabkan penyumbatan serta penyempitan sungai sehingga air lebih sulit tertampung.",
            },
            {
              id: 2,
              question: "Apa itu dataran banjir (floodplain)?",
              answer:
                "Dataran banjir atau floodplain adalah wilayah daratan yang terletak bersebelahan dengan sungai yang membentang dari tepi sungai hingga dasar dinding lembah di sekitarnya. Floodplain biasanya terbentuk oleh proses pengendapan lumpur dan unsur-unsur lain yang terjadi ketika sungai meluap.",
            },
            {
              id: 3,
              question: "Apa bedanya genangan dengan banjir?",
              answer:
                "Banjir dan genangan memiliki beberapa perbedaan, salah satunya berupa waktu. Genangan adalah air yang menggenang setelah hujan namun surut dalam kurun waktu kurang dari 24 jam, sedangkan air menggenang yang tidak surut setelah 1x24 jam diklasifikasi sebagai banjir. Selain itu, genangan memiliki tinggi permukaan air yang kurang dari 40 cm, dimana banjir bisa jauh lebih tinggi dari 40 cm. Genangan juga biasanya melingkupi luas wilayah yang lebih kecil daripada banjir.",
            },

            // Add more questions as needed
          ],
        },
        {
          id: 2,
          title: "Menghadapi Banjir",
          questions: [
            {
              id: 1,
              question:
                "Berapa nomor telepon darurat yang bisa saya hubungi saat banjir melanda?",
              answer: "Kamu bisa menghubungi nomor darurat 112",
            },
            {
              id: 2,
              question:
                "Bagaimana cara menjaga keamanan dan kesehatan di lokasi pengungsian?",
              answer:
                "Tetap perhatikan protokol 3M (memakai masker, mencuci tangan, dan menjaga jarak), bersihkan area yang digunakan untuk tidur, jangan tinggalkan barang berharga sembarangan, beri tahu petugas jika merasa sakit, jaga keamanan dan ketertiban selama di pengungsian, dan hubungi 112 jika berada dalam keadaan darurat.",
            },
            {
              id: 3,
              question:
                "Apa yang harus saya lakukan saat menemukan genangan di Jakarta?",
              answer:
                "Laporkan genangan banjir tersebut melalui website Go Banjir dengan fitur report. Tulis deskripsi, foto kejadian, dan kirimkan laporan.",
            },
            // Add more questions as needed
          ],
        },
        {
          id: 3,
          title: "Penanganan Banjir",
          questions: [
            {
              id: 1,
              question:
                "Apa langkah-langkah mitigasi banjir yang dapat dilakukan?",
              answer:
                " Beberapa langkah mitigasi banjir yang dapat dilakukan antara lain adalah membangun saluran drainase yang baik dan memadai, mengelola sungai secara teratur dengan pembersihan dan pemeliharaan bendungan, menjaga kelestarian hutan dan melakukan penghijauan di daerah resapan air, membangun tanggul atau dinding penahan banjir, menerapkan sistem peringatan dini banjir yang efektif, dan melakukan edukasi kepada masyarakat tentang tindakan yang harus dilakukan saat terjadi banjir.",
            },
            {
              id: 2,
              question:
                "Bagaimana cara mengidentifikasi tanda-tanda akan terjadinya banjir?",
              answer:
                "Tanda-tanda akan terjadinya banjir antara lain adalah meningkatnya tinggi muka air sungai secara signifikan, hujan deras yang terus-menerus, munculnya genangan air di daerah rendah, dan peringatan dini dari pihak berwenang. Selalu memantau perkembangan cuaca dan peringatan banjir dari sumber yang terpercaya dapat membantu dalam mengidentifikasi tanda-tanda banjir.",
            },
            {
              id: 3,
              question: "Apa yang harus dilakukan setelah banjir surut",
              answer:
                "Setelah banjir surut, langkah-langkah yang perlu dilakukan antara lain membersihkan rumah dan lingkungan dari lumpur dan sampah yang tertinggal, mengeringkan barang-barang yang terkena air banjir, memeriksa dan memperbaiki sistem listrik dan instalasi air yang terdampak, serta memeriksa kerusakan struktural pada bangunan dan melaporkannya ke pihak berwenang jika diperlukan.",
            },
            // Add more questions as needed
          ],
        },
      ],
      activeCategory: null,
      searchTerm: "",
    };
  },
  computed: {
    filteredQuestions() {
      if (this.activeCategory) {
        const category = this.faqCategories.find(
          (category) => category.id === this.activeCategory
        );
        return category.questions.filter((question) =>
          question.question
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        );
      } else {
        const allQuestions = this.faqCategories.flatMap(
          (category) => category.questions
        );
        return allQuestions.filter((question) =>
          question.question
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        );
      }
    },
  },
  mounted() {
    this.activeCategory = this.faqCategories[0].id;
    this.setupAccordion();
  },
  methods: {
    toggleQuestion(question) {
      const category = this.faqCategories.find((category) =>
        category.questions.includes(question)
      );

      if (category) {
        category.questions.forEach((q) => {
          if (q.id === question.id) {
            q.expanded = !q.expanded;
          } else {
            q.expanded = false;
          }
        });
      }
    },

    toggleCategory(categoryId) {
      this.resetAccordion().then(() => {
        this.activeCategory = categoryId;
      });
    },

    resetAccordion() {
      return new Promise((resolve) => {
        let toggles = document.getElementsByClassName("faq-question");
        let contentDiv = document.getElementsByClassName("faq-answer");
        let buttons = document.getElementsByClassName("button");

        for (let i = 0; i < toggles.length; i++) {
          contentDiv[i].style.height = "0px";
          toggles[i].classList.remove("expanded");
          buttons[i].textContent = "Lihat";
        }

        setTimeout(() => {
          resolve();
        }, 1);
      });
    },

    setupAccordion() {
      let toggles = document.getElementsByClassName("faq-question");
      let contentDiv = document.getElementsByClassName("faq-answer");
      let buttons = document.getElementsByClassName("button");

      for (let i = 0; i < toggles.length; i++) {
        toggles[i].addEventListener("click", () => {
          const isExpanded = toggles[i].classList.contains("expanded");

          if (!isExpanded) {
            contentDiv[i].style.height = contentDiv[i].scrollHeight + "px";
            contentDiv[i].style.transition = "height 0.3s ease";
            toggles[i].classList.add("expanded");
            buttons[i].textContent = "Tutup";
          } else {
            contentDiv[i].style.height = "0px";
            toggles[i].classList.remove("expanded");
            buttons[i].textContent = "Lihat";
          }

          for (let j = 0; j < contentDiv.length; j++) {
            if (j !== i) {
              contentDiv[j].style.height = "0px";
              toggles[j].classList.remove("expanded");
              buttons[j].textContent = "Lihat";
            }
          }

          setTimeout(() => {
            for (let j = 0; j < contentDiv.length; j++) {
              if (j !== i) {
                contentDiv[j].style.transition = "";
              }
            }
          }, 1);
        });

        // Set the same width for the buttons
        buttons[i].style.width = buttons[i].offsetWidth + "px";
      }
    },
  },
};
</script>
