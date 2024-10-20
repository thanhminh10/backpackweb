import ArticlesList from "@/components/articlesList/ArticlesList";
import DataWrapper from "@/components/DataWrapper";
import BrandListSuggest from "@/components/brandListSuggest/BrandListSuggest";
import SectionHeader from "@/components/sectionHeader/SectionHeader";
import { RemoveLink } from "@/constants";
import { IArticleResponse } from "@/interfaces/article/Article";

interface Props {
    articles?: IArticleResponse; 
    brandsLoading: boolean;
    brandsError: any;
    brandsData: any; 
}

interface Brand {
    id: number; 
    name: string;
    logo: string; 
  }

const RelatedArticles = ({ articles, brandsLoading, brandsError, brandsData } : Props ) => {
    const articleList =  articles?.articles.data ?? [];
  return (
    <div className="flex flex-col items-start gap-6 flex-[4] lg:flex-[1] bg-gray-100">
      <SectionHeader title="Bài viết nổi bật" showProductCount={false} showSort={false} headerTitleSize={20} suggestItem={true} />
      <ArticlesList articleList={articleList} col={1} />

      <SectionHeader title="Thương hiệu" showProductCount={false} showSort={false} headerTitleSize={20} suggestItem={true} />
      <DataWrapper data={brandsData} loading={brandsLoading} error={brandsError}>
        {(data) => <BrandListSuggest brands={(data ?? []).map((item : Brand) => ({ id: item.id, name: item.name, logo: item.logo ? RemoveLink(item.logo):'' }))} />}
      </DataWrapper>
    </div>
  );
};

export default RelatedArticles;
