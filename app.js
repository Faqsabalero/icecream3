const { createApp, ref, computed } = Vue;

createApp({
  setup() {
    const currentCatalog = ref(null);
    const showModal = ref(false);
    const selectedStrain = ref(null);
    const mobileMenuOpen = ref(false);
    const ageVerified = ref(false);
    const searchQuery = ref('');

    // Updated strain groups with exact names and order as requested
    const strainGroups = {
      'mixTropical': [
        'BLUE SUNSET YERBER',
        'TANGIE GHOST TRAIN',
        'PURPLE TANGIE',
        'PURE INFERNO BUTTERMINT',
        'JACK HERER',
        'SEMPAI',
        'RANDY MARS',
        'ORANGINA ZARPADO',
        'CELOSA',
        'LEMON Z',
      ],
      'terpenoTerroso': [
        'GORILA GLUIE',
        'ZOMNBIE KUSH',
        'MIMOSA',
      ],
    };

    // Strain details object (should be updated accordingly if names differ)
    const strainDetails = {
      // Add strain details here matching the updated names or map old names to new ones
      // For brevity, this example assumes the details are the same as before but with updated keys
    };

    // Computed filtered strains by category and search query
    const filteredStrains = computed(() => {
      const query = searchQuery.value.trim().toLowerCase();
      const filterByQuery = (strainName) => {
        if (!query) return true;
        const strain = strainDetails[strainName];
        if (!strain) return false;
        return (
          strainName.toLowerCase().includes(query) ||
          (strain.flavor && strain.flavor.toLowerCase().includes(query)) ||
          (strain.genetics && strain.genetics.toLowerCase().includes(query))
        );
      };

      return {
        mixTropical: strainGroups.mixTropical.filter(filterByQuery),
        terpenoTerroso: strainGroups.terpenoTerroso.filter(filterByQuery),
      };
    });

    function openModal(strain) {
      try {
        if (!strainDetails[strain]) {
          throw new Error(`Strain "${strain}" not found.`);
        }
        selectedStrain.value = strain;
        showModal.value = true;
      } catch (error) {
        console.error(error);
      }
    }

    function closeModal() {
      try {
        showModal.value = false;
        selectedStrain.value = null;
      } catch (error) {
        console.error("Error closing modal:", error);
      }
    }

    function verifyAge(isAdult) {
      try {
        if (isAdult) {
          ageVerified.value = true;
        } else {
          window.location.href = 'https://www.google.com';
        }
      } catch (error) {
        console.error("Error in age verification:", error);
      }
    }

    return {
      currentCatalog,
      showModal,
      selectedStrain,
      strainDetails,
      openModal,
      closeModal,
      mobileMenuOpen,
      ageVerified,
      verifyAge,
      searchQuery,
      filteredStrains,
    };
  },
}).mount('#app');
