<script setup>
import { ref, computed, watch } from 'vue'
import { getfossilData } from '@/services/api'
import card from './components/card.vue'
import NewsSlider from './components/NewsSlider.vue'

const fossilData = ref([])
const getData = async () => {
    fossilData.value = await getfossilData()
}
getData()


</script>